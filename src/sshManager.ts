import * as vscode from 'vscode';
import { Client, ClientChannel, SFTPWrapper } from 'ssh2';
import * as fs from 'fs';
import * as path from 'path';

export interface PagerConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    privateKeyPath: string;
    payloadBasePath: string;
    lootPath: string;
    autoFixLineEndings: boolean;
    autoDeployOnSave: boolean;
    defaultCategory: string;
    showOutputOnRun: boolean;
    connectionTimeout: number;
    deployTimeout: number;
    runTimeout: number;
    autoReconnect: boolean;
}

export function getConfig(): PagerConfig {
    const cfg = vscode.workspace.getConfiguration('pagerDev');
    return {
        host: cfg.get('host', '172.16.52.1'),
        port: cfg.get('port', 22),
        username: cfg.get('username', 'root'),
        password: cfg.get('password', ''),
        privateKeyPath: cfg.get('privateKeyPath', ''),
        payloadBasePath: cfg.get('payloadBasePath', '/root/payloads/user'),
        lootPath: cfg.get('lootPath', '/root/loot'),
        autoFixLineEndings: cfg.get('autoFixLineEndings', true),
        autoDeployOnSave: cfg.get('autoDeployOnSave', false),
        defaultCategory: cfg.get('defaultCategory', 'general'),
        showOutputOnRun: cfg.get('showOutputOnRun', true),
        connectionTimeout: cfg.get('connectionTimeout', 30),
        deployTimeout: cfg.get('deployTimeout', 10),
        runTimeout: cfg.get('runTimeout', 300),
        autoReconnect: cfg.get('autoReconnect', true),
    };
}

export class SSHManager {
    private client: Client | null = null;
    private sftp: SFTPWrapper | null = null;
    private _connected: boolean = false;
    private _onConnectionChange = new vscode.EventEmitter<boolean>();
    public onConnectionChange = this._onConnectionChange.event;
    private password: string = '';
    private statusBar: vscode.StatusBarItem;
    private batteryBar: vscode.StatusBarItem;
    private batteryInterval: NodeJS.Timeout | null = null;
    private reconnectTimer: NodeJS.Timeout | null = null;
    private intentionalDisconnect: boolean = false;

    constructor() {
        this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
        this.statusBar.command = 'pager.connect';
        this.updateStatusBar();
        this.statusBar.show();

        this.batteryBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
        this.batteryBar.command = 'pager.refreshDevice';
    }

    get connected(): boolean {
        return this._connected;
    }

    private updateStatusBar() {
        if (this._connected) {
            const cfg = getConfig();
            this.statusBar.text = `$(plug) Pager @ ${cfg.host}`;
            this.statusBar.tooltip = 'Connected to Pineapple Pager — Click to disconnect';
            this.statusBar.command = 'pager.disconnect';
            this.statusBar.backgroundColor = undefined;
        } else {
            this.statusBar.text = `$(debug-disconnect) Pager: Offline`;
            this.statusBar.tooltip = 'Click to connect to Pineapple Pager';
            this.statusBar.command = 'pager.connect';
            this.statusBar.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        }
    }

    private updateBatteryBar(percent: number, charging: boolean) {
        let icon = '$(battery-full)';
        if (percent <= 10) { icon = '$(battery-empty)'; }
        else if (percent <= 25) { icon = '$(battery-low)'; }
        else if (percent <= 50) { icon = '$(battery-medium)'; }
        else if (percent <= 75) { icon = '$(battery-high)'; }
        if (charging) { icon = '$(battery-charging)'; }

        this.batteryBar.text = `${icon} ${percent}%`;
        this.batteryBar.tooltip = `Pager battery: ${percent}%${charging ? ' (charging)' : ''}`;
        this.batteryBar.show();
    }

    private startBatteryPolling() {
        this.fetchBattery();
        this.batteryInterval = setInterval(() => this.fetchBattery(), 60000);
    }

    private stopBatteryPolling() {
        if (this.batteryInterval) { clearInterval(this.batteryInterval); this.batteryInterval = null; }
        this.batteryBar.hide();
    }

    private async fetchBattery() {
        if (!this._connected) { return; }
        try {
            const out = await this.exec('echo "$(BATTERY_PERCENT 2>/dev/null || cat /sys/class/power_supply/*/capacity 2>/dev/null || echo -1)|$(BATTERY_CHARGING 2>/dev/null || cat /sys/class/power_supply/*/status 2>/dev/null || echo unknown)"');
            const [pctStr, chgStr] = out.trim().split('|');
            const pct = parseInt(pctStr) || -1;
            if (pct >= 0 && pct <= 100) {
                const charging = chgStr === '1' || chgStr?.toLowerCase() === 'charging';
                this.updateBatteryBar(pct, charging);
            }
        } catch { /* device may not support battery queries */ }
    }

    async connect(): Promise<boolean> {
        if (this._connected) {
            return true;
        }

        this.intentionalDisconnect = false;
        const cfg = getConfig();

        if (!cfg.password && !cfg.privateKeyPath) {
            const pw = await vscode.window.showInputBox({
                prompt: `SSH Password for ${cfg.username}@${cfg.host}`,
                password: true,
                placeHolder: 'Enter password...'
            });
            if (!pw) { return false; }
            this.password = pw;
        } else {
            this.password = cfg.password;
        }

        return new Promise((resolve) => {
            this.client = new Client();

            const connectConfig: any = {
                host: cfg.host,
                port: cfg.port,
                username: cfg.username,
                readyTimeout: cfg.connectionTimeout * 1000,
                keepaliveInterval: 10000,
                keepaliveCountMax: 3,
            };

            if (cfg.privateKeyPath) {
                try {
                    connectConfig.privateKey = fs.readFileSync(cfg.privateKeyPath);
                } catch (e) {
                    vscode.window.showErrorMessage(`Cannot read key: ${cfg.privateKeyPath}`);
                    resolve(false);
                    return;
                }
            } else {
                connectConfig.password = this.password;
            }

            this.client.on('ready', () => {
                this._connected = true;
                this._onConnectionChange.fire(true);
                this.updateStatusBar();
                this.startBatteryPolling();
                vscode.window.showInformationMessage(`🍍 Connected to Pager @ ${cfg.host}`);
                resolve(true);
            });

            this.client.on('error', (err) => {
                const msg = err.message || String(err);
                if (msg.includes('Timed out') || msg.includes('handshake')) {
                    vscode.window.showErrorMessage(
                        `SSH handshake timed out connecting to ${cfg.host}:${cfg.port}. ` +
                        `Verify the Pager is powered on and fully booted (3-4 min after power-on), ` +
                        `USB-C data cable is connected, and ${cfg.host} is reachable. ` +
                        `You can increase the timeout in Settings > Pager Dev > Connection Timeout (currently ${cfg.connectionTimeout}s).`,
                        'Retry'
                    ).then(action => {
                        if (action === 'Retry') { this.connect(); }
                    });
                } else if (msg.includes('ECONNREFUSED')) {
                    vscode.window.showErrorMessage(
                        `Connection refused by ${cfg.host}:${cfg.port}. ` +
                        `The Pager may still be booting, or SSH is not running.`,
                        'Retry'
                    ).then(action => {
                        if (action === 'Retry') { this.connect(); }
                    });
                } else if (msg.includes('EHOSTUNREACH') || msg.includes('ENETUNREACH')) {
                    vscode.window.showErrorMessage(
                        `Cannot reach ${cfg.host}. Check that the USB-C data cable is connected ` +
                        `and your network adapter shows the 172.16.52.0/24 interface.`,
                        'Retry'
                    ).then(action => {
                        if (action === 'Retry') { this.connect(); }
                    });
                } else {
                    vscode.window.showErrorMessage(`SSH Error: ${msg}`, 'Retry').then(action => {
                        if (action === 'Retry') { this.connect(); }
                    });
                }
                this.handleDisconnect();
                resolve(false);
            });

            this.client.on('end', () => {
                this.handleDisconnect();
            });

            this.client.on('close', () => {
                this.handleDisconnect();
            });

            try {
                this.client.connect(connectConfig);
            } catch (e: any) {
                vscode.window.showErrorMessage(`Connection failed: ${e.message}`);
                resolve(false);
            }
        });
    }

    private handleDisconnect() {
        const wasConnected = this._connected;
        if (this._connected) {
            this._connected = false;
            this._onConnectionChange.fire(false);
            this.updateStatusBar();
            this.stopBatteryPolling();
        }
        this.sftp = null;

        // Auto-reconnect if the drop was unexpected
        if (wasConnected && !this.intentionalDisconnect) {
            const cfg = getConfig();
            if (cfg.autoReconnect) {
                vscode.window.showWarningMessage(
                    'Pager connection lost. Reconnecting in 3s...',
                    'Reconnect Now', 'Cancel'
                ).then(action => {
                    if (action === 'Cancel') {
                        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
                    } else if (action === 'Reconnect Now') {
                        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
                        this.connect();
                    }
                });
                this.reconnectTimer = setTimeout(() => {
                    this.reconnectTimer = null;
                    if (!this._connected && !this.intentionalDisconnect) {
                        this.connect();
                    }
                }, 3000);
            }
        }
    }

    async disconnect() {
        this.intentionalDisconnect = true;
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); this.reconnectTimer = null; }
        if (this.client) {
            this.client.end();
            this.client = null;
        }
        this.handleDisconnect();
        vscode.window.showInformationMessage('Disconnected from Pager');
    }

    private async getSftp(): Promise<SFTPWrapper> {
        if (this.sftp) { return this.sftp; }
        if (!this.client || !this._connected) {
            throw new Error('Not connected');
        }
        return new Promise((resolve, reject) => {
            this.client!.sftp((err, sftp) => {
                if (err) {
                    this.sftp = null;
                    reject(err);
                    return;
                }
                this.sftp = sftp;
                sftp.on('error', () => { this.sftp = null; });
                resolve(sftp);
            });
        });
    }

    /** Execute a command on the Pager, returns stdout */
    async exec(command: string, timeout?: number): Promise<string> {
        if (!this.client || !this._connected) {
            throw new Error('Not connected to Pager');
        }
        return new Promise((resolve, reject) => {
            this.client!.exec(command, (err, stream) => {
                if (err) { reject(err); return; }
                let stdout = '';
                let stderr = '';

                if (timeout && timeout > 0) {
                    setTimeout(() => {
                        stream.close();
                        reject(new Error(`Command timed out after ${timeout}s`));
                    }, timeout * 1000);
                }

                stream.on('data', (data: Buffer) => { stdout += data.toString(); });
                stream.stderr.on('data', (data: Buffer) => { stderr += data.toString(); });
                stream.on('close', (code: number) => {
                    if (code === 0 || code === null) {
                        resolve(stdout);
                    } else {
                        reject(new Error(`Exit code ${code}: ${stderr || stdout}`));
                    }
                });
            });
        });
    }

    /** Execute a command and stream output line by line to callback */
    async execStream(command: string, onData: (line: string) => void, onError?: (line: string) => void): Promise<{ stream: ClientChannel; kill: () => void }> {
        if (!this.client || !this._connected) {
            throw new Error('Not connected to Pager');
        }
        return new Promise((resolve, reject) => {
            this.client!.exec(command, { pty: true }, (err, stream) => {
                if (err) { reject(err); return; }

                stream.on('data', (data: Buffer) => {
                    const lines = data.toString().split('\n');
                    for (const line of lines) {
                        if (line.trim()) { onData(line); }
                    }
                });

                stream.stderr.on('data', (data: Buffer) => {
                    const lines = data.toString().split('\n');
                    for (const line of lines) {
                        if (line.trim() && onError) { onError(line); }
                    }
                });

                const kill = () => {
                    stream.write('\x03'); // Send Ctrl+C
                    setTimeout(() => {
                        try { stream.signal('KILL'); } catch {}
                        try { stream.close(); } catch {}
                    }, 500);
                };

                resolve({ stream, kill });
            });
        });
    }

    /** Upload a file to the Pager via SFTP */
    async uploadFile(localPath: string, remotePath: string): Promise<void> {
        const sftp = await this.getSftp();

        // Ensure remote directory exists
        const remoteDir = path.posix.dirname(remotePath);
        await this.exec(`mkdir -p "${remoteDir}"`);

        return new Promise((resolve, reject) => {
            sftp.fastPut(localPath, remotePath, (err) => {
                if (err) { reject(err); return; }
                resolve();
            });
        });
    }

    /** Upload string content directly to remote file via exec */
    async uploadContent(content: string, remotePath: string): Promise<void> {
        const remoteDir = path.posix.dirname(remotePath);
        await this.exec(`mkdir -p "${remoteDir}"`);

        // Use base64 encoding to safely transfer content via exec
        const b64 = Buffer.from(content).toString('base64');
        // Split into chunks to avoid command line length limits
        const chunkSize = 4000;
        const chunks = [];
        for (let i = 0; i < b64.length; i += chunkSize) {
            chunks.push(b64.substring(i, i + chunkSize));
        }

        // Write base64 chunks to temp file, then decode
        const tmpFile = `/tmp/_pager_upload_${Date.now()}.b64`;
        for (let i = 0; i < chunks.length; i++) {
            const op = i === 0 ? '>' : '>>';
            await this.exec(`printf '%s' '${chunks[i]}' ${op} ${tmpFile}`);
        }
        await this.exec(`base64 -d ${tmpFile} > "${remotePath}" && rm -f ${tmpFile}`);
    }

    /** Upload a local directory recursively to the Pager */
    async uploadDirectory(localDir: string, remoteDir: string): Promise<number> {
        await this.exec(`mkdir -p "${remoteDir}"`);
        let count = 0;
        const entries = fs.readdirSync(localDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name.startsWith('.')) { continue; }
            const localPath = path.join(localDir, entry.name);
            const remotePath = `${remoteDir}/${entry.name}`;
            if (entry.isDirectory()) {
                count += await this.uploadDirectory(localPath, remotePath);
            } else {
                const content = fs.readFileSync(localPath, 'utf-8');
                await this.uploadContent(content, remotePath);
                count++;
            }
        }
        return count;
    }

    /** Download a file from the Pager */
    async downloadFile(remotePath: string, localPath: string): Promise<void> {
        const sftp = await this.getSftp();
        const localDir = path.dirname(localPath);
        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, { recursive: true });
        }
        return new Promise((resolve, reject) => {
            sftp.fastGet(remotePath, localPath, (err) => {
                if (err) { reject(err); return; }
                resolve();
            });
        });
    }

    /** Read remote file content - uses exec for reliability */
    async readFile(remotePath: string): Promise<string> {
        return await this.exec(`cat "${remotePath}"`);
    }

    /** Read remote binary file as hex dump */
    async readFileHex(remotePath: string, limit: number = 512): Promise<string> {
        return await this.exec(`hexdump -C "${remotePath}" 2>/dev/null | head -${Math.ceil(limit / 16)}`);
    }

    /** List directory contents - uses exec instead of SFTP for reliability on dropbear */
    async listDir(remotePath: string): Promise<{ name: string; isDir: boolean; size: number; modified: Date }[]> {
        try {
            const output = await this.exec(
                `ls -la "${remotePath}" 2>/dev/null | tail -n +2`
            );
            const items: { name: string; isDir: boolean; size: number; modified: Date }[] = [];
            for (const line of output.split('\n')) {
                const trimmed = line.trim();
                if (!trimmed || trimmed.startsWith('total')) { continue; }
                const parts = trimmed.split(/\s+/);
                if (parts.length < 9) { continue; }
                const perms = parts[0];
                const size = parseInt(parts[4]) || 0;
                const name = parts.slice(8).join(' ');
                if (name === '.' || name === '..') { continue; }
                items.push({
                    name,
                    isDir: perms.startsWith('d'),
                    size,
                    modified: new Date(),
                });
            }
            return items;
        } catch (err: any) {
            throw new Error(`Cannot list ${remotePath}: ${err.message}`);
        }
    }

    /** Check if remote path exists */
    async exists(remotePath: string): Promise<boolean> {
        try {
            await this.exec(`test -e "${remotePath}" && echo "yes"`);
            return true;
        } catch {
            return false;
        }
    }

    dispose() {
        this.intentionalDisconnect = true;
        if (this.reconnectTimer) { clearTimeout(this.reconnectTimer); }
        this.stopBatteryPolling();
        this.disconnect();
        this.statusBar.dispose();
        this.batteryBar.dispose();
        this._onConnectionChange.dispose();
    }
}

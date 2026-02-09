import * as vscode from 'vscode';
import * as path from 'path';
import { SSHManager, getConfig } from './sshManager';

// ============================================================
// Device Info Tree View
// ============================================================

class DeviceInfoItem extends vscode.TreeItem {
    constructor(label: string, value?: string, icon?: string, collapsible?: vscode.TreeItemCollapsibleState) {
        super(label, collapsible ?? vscode.TreeItemCollapsibleState.None);
        if (value) { this.description = value; }
        if (icon) { this.iconPath = new vscode.ThemeIcon(icon); }
    }
    public children?: DeviceInfoItem[];
}

export class DeviceInfoProvider implements vscode.TreeDataProvider<DeviceInfoItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<DeviceInfoItem | undefined>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;
    private info: { [key: string]: string } = {};

    constructor(private ssh: SSHManager) {
        ssh.onConnectionChange(async (connected: boolean) => {
            if (connected) { await this.fetchInfo(); }
            else { this.info = {}; }
            this.refresh();
        });
    }

    refresh(): void {
        if (this.ssh.connected) { this.fetchInfo().then(() => this._onDidChangeTreeData.fire(undefined)); }
        else { this._onDidChangeTreeData.fire(undefined); }
    }

    private async fetchInfo(): Promise<void> {
        try {
            const script = [
                'echo "---MODEL---"', 'cat /tmp/sysinfo/model 2>/dev/null || echo unknown',
                'echo "---KERNEL---"', 'uname -r',
                'echo "---OPENWRT---"', "cat /etc/openwrt_release 2>/dev/null | grep DISTRIB_RELEASE | cut -d\"'\" -f2 || echo unknown",
                'echo "---FIRMWARE---"', 'cat /etc/pineapple/version 2>/dev/null || cat /etc/hak5_version 2>/dev/null || cat /etc/hak5/version 2>/dev/null || cat /etc/pager/version 2>/dev/null || cat /etc/pager_version 2>/dev/null || uci get system.@system[0].firmware_version 2>/dev/null || (cat /etc/os-release 2>/dev/null | grep VERSION_ID | cut -d= -f2) || cat /etc/openwrt_version 2>/dev/null || echo unknown',
                'echo "---UPTIME---"', "awk '{print int($1)}' /proc/uptime",
                'echo "---MEMORY---"', "awk '/MemTotal/{t=$2} /MemAvailable/{a=$2} END{printf \"%d/%dMB\",a/1024,t/1024}' /proc/meminfo",
                'echo "---OVERLAY---"', "df /overlay 2>/dev/null | tail -1 | awk '{printf \"%s/%sMB (%s)\",$4/1024,$2/1024,$5}'",
                'echo "---MMC---"', "df /mmc 2>/dev/null | tail -1 | awk '{printf \"%s/%sMB (%s)\",$4/1024,$2/1024,$5}'",
                'echo "---RADIOS---"', 'ls -d /sys/class/ieee80211/phy* 2>/dev/null | wc -l',
                'echo "---BT---"', "hciconfig hci0 2>/dev/null | grep 'BD Address' | awk '{print $3}' || echo N/A",
                'echo "---IP---"', "ip -4 addr show br-lan 2>/dev/null | grep inet | awk '{print $2}'",
                'echo "---LOAD---"', "cat /proc/loadavg | awk '{print $1,$2,$3}'",
                'echo "---PROCS---"', 'ls -d /proc/[0-9]* 2>/dev/null | wc -l',
                'echo "---BATTERY---"', 'BATTERY_PERCENT 2>/dev/null || cat /sys/class/power_supply/*/capacity 2>/dev/null || echo N/A',
                'echo "---CHARGING---"', 'BATTERY_CHARGING 2>/dev/null || cat /sys/class/power_supply/*/status 2>/dev/null || echo N/A',
                // WiFi status
                'echo "---WIFICLIENT---"', "iwinfo wlan0cli info 2>/dev/null | head -1 || echo disconnected",
                'echo "---WIFIOPEN---"', "iwinfo wlan0open info 2>/dev/null | head -1 || echo disabled",
                'echo "---WIFIWPA---"', "iwinfo wlan0wpa info 2>/dev/null | head -1 || echo disabled",
                'echo "---WIFIMGMT---"', "iwinfo wlan0mgmt info 2>/dev/null | head -1 || echo disabled",
                'echo "---WIFIMON---"', "iwinfo wlan1mon info 2>/dev/null | head -1 || echo disabled",
                'echo "---WIFICLIENTIP---"', "ip -4 addr show wlan0cli 2>/dev/null | grep inet | awk '{print $2}' || echo N/A",
                'echo "---END---"',
            ].join('; ');

            const output = await this.ssh.exec(script);
            const get = (name: string): string => {
                const re = new RegExp(`---${name}---\\s*([\\s\\S]*?)\\s*---`);
                const m = output.match(re);
                return m ? m[1].trim() : 'N/A';
            };

            const upSec = parseInt(get('UPTIME')) || 0;
            const battPct = get('BATTERY');
            const charging = get('CHARGING');
            let batteryStr = battPct;
            if (battPct !== 'N/A') {
                batteryStr = `${battPct}%${charging === '1' || charging?.toLowerCase() === 'charging' ? ' (charging)' : ''}`;
            }

            this.info = {
                model: get('MODEL'), kernel: get('KERNEL'), openwrt: get('OPENWRT'),
                firmware: get('FIRMWARE'),
                uptime: `${Math.floor(upSec / 3600)}h ${Math.floor((upSec % 3600) / 60)}m`,
                memory: get('MEMORY'), overlay: get('OVERLAY'), mmc: get('MMC'),
                radios: get('RADIOS'), bluetooth: get('BT'), ip: get('IP'),
                load: get('LOAD'), procs: get('PROCS'), battery: batteryStr,
                wifiClient: get('WIFICLIENT'), wifiOpen: get('WIFIOPEN'),
                wifiWpa: get('WIFIWPA'), wifiMgmt: get('WIFIMGMT'),
                wifiMon: get('WIFIMON'), wifiClientIp: get('WIFICLIENTIP'),
            };
        } catch (err: any) {
            this.info = { error: err.message };
        }
    }

    getTreeItem(element: DeviceInfoItem): vscode.TreeItem { return element; }

    async getChildren(element?: DeviceInfoItem): Promise<DeviceInfoItem[]> {
        if (!this.ssh.connected) { return []; }
        if (!Object.keys(this.info).length) { await this.fetchInfo(); }

        // Return children for collapsible items
        if (element?.children) { return element.children; }

        if (this.info.error) { return [new DeviceInfoItem('Error', this.info.error, 'error')]; }

        // WiFi section with children
        const wifiSection = new DeviceInfoItem('WiFi', undefined, 'radio-tower', vscode.TreeItemCollapsibleState.Collapsed);
        wifiSection.children = [
            new DeviceInfoItem('Client (wlan0cli)', this.info.wifiClient, 'plug'),
            new DeviceInfoItem('Client IP', this.info.wifiClientIp, 'globe'),
            new DeviceInfoItem('Open AP', this.info.wifiOpen, 'broadcast'),
            new DeviceInfoItem('WPA AP', this.info.wifiWpa, 'shield'),
            new DeviceInfoItem('Mgmt AP', this.info.wifiMgmt, 'lock'),
            new DeviceInfoItem('Monitor', this.info.wifiMon, 'eye'),
        ];

        return [
            new DeviceInfoItem('Model', this.info.model, 'device-mobile'),
            new DeviceInfoItem('Firmware', this.info.firmware, 'versions'),
            new DeviceInfoItem('IP', this.info.ip, 'globe'),
            new DeviceInfoItem('Battery', this.info.battery, 'battery-full'),
            new DeviceInfoItem('Kernel', this.info.kernel, 'terminal'),
            new DeviceInfoItem('OpenWRT', this.info.openwrt, 'package'),
            new DeviceInfoItem('Uptime', this.info.uptime, 'clock'),
            new DeviceInfoItem('Load', this.info.load, 'pulse'),
            new DeviceInfoItem('Memory', this.info.memory, 'database'),
            new DeviceInfoItem('Overlay', this.info.overlay, 'save'),
            new DeviceInfoItem('MMC', this.info.mmc, 'save-all'),
            wifiSection,
            new DeviceInfoItem('Radios', this.info.radios, 'radio-tower'),
            new DeviceInfoItem('Bluetooth', this.info.bluetooth, 'bluetooth'),
            new DeviceInfoItem('Processes', this.info.procs, 'server-process'),
        ];
    }

    dispose() { this._onDidChangeTreeData.dispose(); }
}

// ============================================================
// Payload Tree View — browse, run, delete, rename, pull
// ============================================================

export class PayloadTreeItem extends vscode.TreeItem {
    constructor(
        public readonly itemLabel: string,
        public readonly remotePath: string,
        public readonly isDir: boolean,
        public readonly depth: number,
        collapsible: vscode.TreeItemCollapsibleState
    ) {
        super(itemLabel, collapsible);

        if (isDir && depth === 0) {
            this.contextValue = 'payloadCategory';
            this.iconPath = new vscode.ThemeIcon('folder-library');
        } else if (isDir) {
            this.contextValue = 'payloadDir';
            this.iconPath = new vscode.ThemeIcon('folder');
        } else {
            this.contextValue = 'payloadFile';
            this.iconPath = new vscode.ThemeIcon('file-code');
            this.command = {
                command: 'pager.previewRemotePayload',
                title: 'Preview',
                arguments: [this]
            };
        }
    }
}

export class PayloadTreeProvider implements vscode.TreeDataProvider<PayloadTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<PayloadTreeItem | undefined>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private ssh: SSHManager) {
        ssh.onConnectionChange((connected: boolean) => {
            if (connected) { setTimeout(() => this.refresh(), 3000); }
            else { this.refresh(); }
        });
    }

    refresh(): void { this._onDidChangeTreeData.fire(undefined); }

    getTreeItem(element: PayloadTreeItem): vscode.TreeItem { return element; }

    async getChildren(element?: PayloadTreeItem): Promise<PayloadTreeItem[]> {
        if (!this.ssh.connected) { return []; }
        const cfg = getConfig();
        const remotePath = element ? element.remotePath : cfg.payloadBasePath;
        const depth = element ? element.depth + 1 : 0;

        try {
            const items = await this.ssh.listDir(remotePath);
            return items
                .filter(i => !i.name.startsWith('.'))
                .sort((a, b) => {
                    if (a.isDir !== b.isDir) { return a.isDir ? -1 : 1; }
                    return a.name.localeCompare(b.name);
                })
                .map(i => new PayloadTreeItem(
                    i.name, `${remotePath}/${i.name}`, i.isDir, depth,
                    i.isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
                ));
        } catch { return []; }
    }

    async previewPayload(item: PayloadTreeItem): Promise<void> {
        if (!item) { return; }
        const filePath = item.isDir ? `${item.remotePath}/payload.sh` : item.remotePath;
        try {
            const content = await this.ssh.readFile(filePath);
            const tmpDir = path.join(require('os').tmpdir(), 'pager-payloads');
            const fs = require('fs');
            if (!fs.existsSync(tmpDir)) { fs.mkdirSync(tmpDir, { recursive: true }); }
            const label = item.isDir ? `${item.itemLabel}_payload.sh` : `${path.basename(path.dirname(item.remotePath))}_${item.itemLabel}`;
            const tmpFile = path.join(tmpDir, label);
            fs.writeFileSync(tmpFile, content);
            const doc = await vscode.workspace.openTextDocument(tmpFile);
            await vscode.window.showTextDocument(doc, { preview: true });
        } catch (err: any) {
            vscode.window.showErrorMessage(`Cannot read: ${err.message}`);
        }
    }

    async deletePayload(item: PayloadTreeItem): Promise<void> {
        if (!item) { return; }
        const what = item.isDir ? `"${item.itemLabel}" and all its contents` : `file "${item.itemLabel}"`;
        const confirm = await vscode.window.showWarningMessage(
            `Delete ${what} from device? This cannot be undone.`,
            { modal: true }, 'Delete'
        );
        if (confirm !== 'Delete') { return; }

        try {
            await this.ssh.exec(`rm -rf "${item.remotePath}"`);
            vscode.window.showInformationMessage(`Deleted: ${item.itemLabel}`);
            this.refresh();
        } catch (err: any) {
            vscode.window.showErrorMessage(`Delete failed: ${err.message}`);
        }
    }

    async renamePayload(item: PayloadTreeItem): Promise<void> {
        if (!item) { return; }
        const newName = await vscode.window.showInputBox({
            prompt: `Rename "${item.itemLabel}" to:`,
            value: item.itemLabel,
            validateInput: (v: string) => /^[a-zA-Z0-9_-]+$/.test(v) ? null : 'Letters, numbers, underscore, hyphen only'
        });
        if (!newName || newName === item.itemLabel) { return; }

        const parentDir = path.posix.dirname(item.remotePath);
        const newPath = `${parentDir}/${newName}`;

        try {
            await this.ssh.exec(`mv "${item.remotePath}" "${newPath}"`);
            vscode.window.showInformationMessage(`Renamed: ${item.itemLabel} → ${newName}`);
            this.refresh();
        } catch (err: any) {
            vscode.window.showErrorMessage(`Rename failed: ${err.message}`);
        }
    }

    getPayloadPath(item: PayloadTreeItem): string {
        if (!item.isDir) {
            return item.remotePath;
        }
        return `${item.remotePath}/payload.sh`;
    }

    async pullPayload(item: PayloadTreeItem): Promise<void> {
        if (!item) { return; }
        const filePath = item.isDir ? `${item.remotePath}/payload.sh` : item.remotePath;
        const fileName = item.isDir ? 'payload.sh' : item.itemLabel;
        try {
            const content = await this.ssh.readFile(filePath);

            const defaultDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || require('os').homedir();
            const payloadDir = item.isDir ? item.itemLabel : path.basename(path.dirname(item.remotePath));
            const defaultUri = vscode.Uri.file(path.join(defaultDir, payloadDir, fileName));

            const saveUri = await vscode.window.showSaveDialog({ defaultUri, filters: { 'Shell Script': ['sh'], 'All': ['*'] } });
            if (!saveUri) { return; }

            const fsMod = require('fs');
            const dir = path.dirname(saveUri.fsPath);
            if (!fsMod.existsSync(dir)) { fsMod.mkdirSync(dir, { recursive: true }); }
            fsMod.writeFileSync(saveUri.fsPath, content);

            const doc = await vscode.workspace.openTextDocument(saveUri);
            await vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage(`Downloaded: ${fileName}`);
        } catch (err: any) {
            vscode.window.showErrorMessage(`Download failed: ${err.message}`);
        }
    }

    dispose() { this._onDidChangeTreeData.dispose(); }
}

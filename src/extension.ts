import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SSHManager, getConfig } from './sshManager';
import { PayloadManager } from './payloadManager';
import { LootExplorerProvider } from './lootExplorer';
import { DeviceInfoProvider, PayloadTreeProvider, PayloadTreeItem } from './deviceViews';

let ssh: SSHManager;
let payloads: PayloadManager;
let lootExplorer: LootExplorerProvider;
let deviceInfo: DeviceInfoProvider;
let payloadTree: PayloadTreeProvider;

// Active log streaming state
let logStream: { kill: () => void } | null = null;
let logChannel: vscode.OutputChannel | null = null;

export function activate(context: vscode.ExtensionContext) {
    try {
        console.log('Pineapple Pager Dev extension activated');

    ssh = new SSHManager();
    payloads = new PayloadManager(ssh);
    lootExplorer = new LootExplorerProvider(ssh);
    deviceInfo = new DeviceInfoProvider(ssh);
    payloadTree = new PayloadTreeProvider(ssh);

    // Tree views
    vscode.window.registerTreeDataProvider('pagerDeviceInfo', deviceInfo);
    vscode.window.registerTreeDataProvider('pagerPayloads', payloadTree);
    vscode.window.registerTreeDataProvider('pagerLootExplorer', lootExplorer);

    // ====================================
    // Connection
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.connect', () => ssh.connect()),
        vscode.commands.registerCommand('pager.disconnect', () => ssh.disconnect()),
    );

    // ====================================
    // Deploy & Run commands
    // ====================================
    context.subscriptions.push(
        // Deploy only (always uploads)
        vscode.commands.registerCommand('pager.deploy', (uri?: vscode.Uri) => payloads.deploy(uri)),

        // Deploy & Run (always uploads, then runs)
        vscode.commands.registerCommand('pager.deployAndRun', (uri?: vscode.Uri) => payloads.deployAndRun(uri)),

        // Smart Deploy & Run — only uploads if file changed, then runs (DEFAULT — Ctrl+Shift+R)
        vscode.commands.registerCommand('pager.smartDeployAndRun', (uri?: vscode.Uri) => payloads.smartDeployAndRun(uri)),

        // Run on Device — runs already-deployed version, no upload
        vscode.commands.registerCommand('pager.runOnDevice', (uri?: vscode.Uri) => payloads.runOnDevice(uri)),

        // Run Remote — run a specific payload from sidebar tree (file or dir)
        vscode.commands.registerCommand('pager.runRemote', (item: PayloadTreeItem) => {
            if (item) {
                const payloadPath = payloadTree.getPayloadPath(item);
                payloads.runRemote(payloadPath);
            }
        }),

        // Deploy Folder — upload all files in payload directory
        vscode.commands.registerCommand('pager.deployFolder', (uri?: vscode.Uri) => payloads.deployFolder(uri)),

        // Stop
        vscode.commands.registerCommand('pager.stop', () => payloads.stop()),

        // Validate
        vscode.commands.registerCommand('pager.validatePayload', () => payloads.validateCurrentPayload()),
        vscode.commands.registerCommand('pager.fixLineEndings', () => payloads.fixLineEndingsInEditor()),
    );

    // ====================================
    // Payload management on device
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.refreshPayloads', () => payloadTree.refresh()),
        vscode.commands.registerCommand('pager.deletePayload', (item: PayloadTreeItem) => payloadTree.deletePayload(item)),
        vscode.commands.registerCommand('pager.renamePayload', (item: PayloadTreeItem) => payloadTree.renamePayload(item)),
        vscode.commands.registerCommand('pager.pullPayload', (item: PayloadTreeItem) => payloadTree.pullPayload(item)),
        vscode.commands.registerCommand('pager.previewRemotePayload', (item: PayloadTreeItem) => payloadTree.previewPayload(item)),
    );

    // ====================================
    // Loot management
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.viewLoot', () => lootExplorer.refresh()),
        vscode.commands.registerCommand('pager.refreshLoot', () => lootExplorer.refresh()),
        vscode.commands.registerCommand('pager.downloadLoot', (item: any) => lootExplorer.downloadLoot(item)),
        vscode.commands.registerCommand('pager.previewLoot', (item: any) => lootExplorer.previewLoot(item)),
        vscode.commands.registerCommand('pager.deleteLoot', (item: any) => lootExplorer.deleteLoot(item)),
    );

    // ====================================
    // Device info
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.refreshDevice', () => deviceInfo.refresh()),
        vscode.commands.registerCommand('pager.deviceInfo', async () => {
            if (!ssh.connected) { await ssh.connect(); }
            deviceInfo.refresh();
        }),
    );

    // ====================================
    // Device Log Streaming
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.streamLogs', async () => {
            if (!ssh.connected) { if (!(await ssh.connect())) { return; } }
            if (logStream) {
                logStream.kill();
                logStream = null;
                vscode.window.showInformationMessage('Log streaming stopped');
                return;
            }

            if (!logChannel) {
                logChannel = vscode.window.createOutputChannel('Pager Logs');
            }
            logChannel.clear();
            logChannel.show(true);
            logChannel.appendLine(`[${new Date().toLocaleTimeString()}] Starting log stream...`);

            try {
                const { kill } = await ssh.execStream(
                    'logread -f 2>/dev/null || dmesg -w 2>/dev/null || tail -f /var/log/messages 2>/dev/null',
                    (line: string) => {
                        logChannel?.appendLine(line.replace(/\r/g, '').trim());
                    },
                    (line: string) => {
                        logChannel?.appendLine(`[err] ${line}`);
                    }
                );
                logStream = { kill };
                vscode.window.showInformationMessage('Log streaming started (run command again to stop)');
            } catch (err: any) {
                vscode.window.showErrorMessage(`Log stream failed: ${err.message}`);
            }
        }),
    );

    // ====================================
    // Payload Config Editor
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.editPayloadConfig', async () => {
            if (!ssh.connected) { if (!(await ssh.connect())) { return; } }

            // Ask for payload name
            const payloadName = await vscode.window.showInputBox({
                prompt: 'Payload name (used in PAYLOAD_GET_CONFIG)',
                placeHolder: 'my_payload',
            });
            if (!payloadName) { return; }

            try {
                // Try to fetch all config for this payload via UCI
                let configText = '';
                try {
                    configText = await ssh.exec(`uci show pager_payload.${payloadName} 2>/dev/null || echo "(no config found)"`);
                } catch {
                    configText = '(no config found)';
                }

                const action = await vscode.window.showQuickPick([
                    { label: 'View Config', id: 'view' },
                    { label: 'Set Value', id: 'set' },
                    { label: 'Delete Key', id: 'del' },
                ], { placeHolder: `Config for: ${payloadName}` });
                if (!action) { return; }

                if (action.id === 'view') {
                    const channel = vscode.window.createOutputChannel(`Pager Config: ${payloadName}`);
                    channel.clear();
                    channel.appendLine(`Payload config: ${payloadName}`);
                    channel.appendLine('─'.repeat(40));
                    channel.appendLine(configText);
                    channel.show();
                } else if (action.id === 'set') {
                    const key = await vscode.window.showInputBox({ prompt: 'Config key' });
                    if (!key) { return; }
                    const value = await vscode.window.showInputBox({ prompt: `Value for "${key}"` });
                    if (value === undefined) { return; }
                    await ssh.exec(`uci set "pager_payload.${payloadName}.${key}=${value}" 2>/dev/null && uci commit pager_payload 2>/dev/null`);
                    vscode.window.showInformationMessage(`Set ${payloadName}.${key} = ${value}`);
                } else if (action.id === 'del') {
                    const key = await vscode.window.showInputBox({ prompt: 'Config key to delete' });
                    if (!key) { return; }
                    await ssh.exec(`uci delete "pager_payload.${payloadName}.${key}" 2>/dev/null; uci commit pager_payload 2>/dev/null`);
                    vscode.window.showInformationMessage(`Deleted ${payloadName}.${key}`);
                }
            } catch (err: any) {
                vscode.window.showErrorMessage(`Config error: ${err.message}`);
            }
        }),
    );

    // ====================================
    // Terminal
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.openTerminal', () => {
            const cfg = getConfig();
            const terminal = vscode.window.createTerminal({
                name: 'Pager SSH',
                shellPath: process.platform === 'win32' ? 'cmd.exe' : '/bin/bash',
                shellArgs: process.platform === 'win32'
                    ? ['/c', `ssh ${cfg.username}@${cfg.host} -p ${cfg.port}`]
                    : ['-c', `ssh ${cfg.username}@${cfg.host} -p ${cfg.port}`],
            });
            terminal.show();
        }),
    );

    // ====================================
    // New Payload from Template
    // ====================================
    context.subscriptions.push(
        vscode.commands.registerCommand('pager.newPayload', async () => {
            const templates = [
                { label: 'Basic Payload', id: 'basic', description: 'Simple user payload boilerplate' },
                { label: 'Reconnaissance', id: 'recon', description: 'Loop-based scanning template' },
                { label: 'WiFi Audit', id: 'wifi', description: 'Channel enumeration' },
                { label: 'Bluetooth Scanner', id: 'bt', description: 'BLE/classic scan' },
                { label: 'Data Exfiltration', id: 'exfil', description: 'JSON data collection' },
                { label: 'Interactive', id: 'interactive', description: 'Text/number pickers, dialogs' },
                { label: 'Alert: Handshake Captured', id: 'alert_handshake', description: 'Triggered on WPA handshake capture' },
                { label: 'Alert: Client Connected', id: 'alert_client_connected', description: 'Triggered when client connects to AP' },
                { label: 'Alert: Client Disconnected', id: 'alert_client_disconnected', description: 'Triggered when client disconnects' },
                { label: 'Alert: Deauth Flood', id: 'alert_deauth', description: 'Triggered on deauth flood detection' },
                { label: 'Recon: AP Scanner', id: 'recon_ap', description: 'Run against discovered access point' },
                { label: 'Recon: Client Scanner', id: 'recon_client', description: 'Run against discovered client' },
            ];
            const picked = await vscode.window.showQuickPick(templates, { placeHolder: 'Choose template' });
            if (!picked) { return; }

            const name = await vscode.window.showInputBox({
                prompt: 'Payload name',
                placeHolder: 'my_payload',
                validateInput: (v: string) => /^[a-zA-Z0-9_-]+$/.test(v) ? null : 'Letters, numbers, _, - only'
            });
            if (!name) { return; }

            let targetDir: string;
            const isAlert = picked.id.startsWith('alert_');
            const isReconPayload = picked.id.startsWith('recon_');

            if (isAlert) {
                const eventType = picked.id.replace('alert_', '');
                const eventMap: { [k: string]: string } = {
                    handshake: 'handshake_captured',
                    client_connected: 'pineapple_client_connected',
                    client_disconnected: 'pineapple_client_disconnected',
                    deauth: 'deauth_flood_detected',
                };
                const event = eventMap[eventType] || eventType;
                if (vscode.workspace.workspaceFolders?.length) {
                    targetDir = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'alerts', event, name);
                } else {
                    const folder = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, openLabel: 'Create here' });
                    if (!folder?.length) { return; }
                    targetDir = path.join(folder[0].fsPath, 'alerts', event, name);
                }
            } else if (isReconPayload) {
                if (vscode.workspace.workspaceFolders?.length) {
                    targetDir = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, 'recon', name);
                } else {
                    const folder = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, openLabel: 'Create here' });
                    if (!folder?.length) { return; }
                    targetDir = path.join(folder[0].fsPath, 'recon', name);
                }
            } else {
                if (vscode.workspace.workspaceFolders?.length) {
                    targetDir = path.join(vscode.workspace.workspaceFolders[0].uri.fsPath, name);
                } else {
                    const folder = await vscode.window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, openLabel: 'Create here' });
                    if (!folder?.length) { return; }
                    targetDir = path.join(folder[0].fsPath, name);
                }
            }

            if (!fs.existsSync(targetDir)) { fs.mkdirSync(targetDir, { recursive: true }); }
            const filePath = path.join(targetDir, 'payload.sh');
            fs.writeFileSync(filePath, getTemplate(picked.id, name), { encoding: 'utf-8' });

            const doc = await vscode.workspace.openTextDocument(filePath);
            await vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage(`Created: ${name}/payload.sh`);
        }),
    );

    // ====================================
    // Auto-deploy on save
    // ====================================
    context.subscriptions.push(
        vscode.workspace.onDidSaveTextDocument(async (doc: vscode.TextDocument) => {
            const cfg = getConfig();
            if (!cfg.autoDeployOnSave || !ssh.connected) { return; }
            if (path.basename(doc.uri.fsPath) !== 'payload.sh') { return; }
            await payloads.deploy(doc.uri);
        }),
    );

    context.subscriptions.push(ssh, payloads, lootExplorer, deviceInfo, payloadTree);

    } catch (err: any) {
        vscode.window.showErrorMessage(`Pager Dev extension failed to activate: ${err.message}`);
        console.error('Pager Dev activation error:', err);
    }
}

function getTemplate(id: string, name: string): string {
    // ── Alert payload templates ──
    if (id === 'alert_handshake') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Alert triggered when a WPA handshake is captured

# Available environment variables:
#   \$_ALERT                          — alert name
#   \$_ALERT_HANDSHAKE_SUMMARY        — human-readable description
#   \$_ALERT_HANDSHAKE_AP_MAC_ADDRESS — AP MAC address
#   \$_ALERT_HANDSHAKE_CLIENT_MAC_ADDRESS — client MAC address
#   \$_ALERT_HANDSHAKE_TYPE           — EAPOL or PMKID
#   \$_ALERT_HANDSHAKE_COMPLETE       — complete 4-way? (EAPOL only)
#   \$_ALERT_HANDSHAKE_CRACKABLE      — crackable? (EAPOL only)
#   \$_ALERT_HANDSHAKE_PCAP_PATH      — path to pcap file
#   \$_ALERT_HANDSHAKE_HASHCAT_PATH   — path to hashcat .22000 file

LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"

ALERT "Handshake: \${_ALERT_HANDSHAKE_TYPE} from \${_ALERT_HANDSHAKE_AP_MAC_ADDRESS}"
LOG green "Handshake captured: \${_ALERT_HANDSHAKE_SUMMARY}"
LOG cyan "  AP:     \${_ALERT_HANDSHAKE_AP_MAC_ADDRESS}"
LOG cyan "  Client: \${_ALERT_HANDSHAKE_CLIENT_MAC_ADDRESS}"
LOG cyan "  Type:   \${_ALERT_HANDSHAKE_TYPE}"
LOG cyan "  PCAP:   \${_ALERT_HANDSHAKE_PCAP_PATH}"

echo "\$(date),\${_ALERT_HANDSHAKE_AP_MAC_ADDRESS},\${_ALERT_HANDSHAKE_CLIENT_MAC_ADDRESS},\${_ALERT_HANDSHAKE_TYPE}" >> "\${LOOT_DIR}/handshakes.csv"

exit 0
`;
    }

    if (id === 'alert_client_connected') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Alert triggered when a client connects to a Pineapple AP

# Available environment variables:
#   \$_ALERT_CLIENT_CONNECTED_SUMMARY            — human-readable summary
#   \$_ALERT_CLIENT_CONNECTED_CLIENT_MAC_ADDRESS  — client MAC address
#   \$_ALERT_CLIENT_CONNECTED_SSID               — SSID client connected to
#   \$_ALERT_CLIENT_CONNECTED_SSID_LENGTH         — SSID length

ALERT "Client connected: \${_ALERT_CLIENT_CONNECTED_CLIENT_MAC_ADDRESS}"
LOG green "Client connected to \${_ALERT_CLIENT_CONNECTED_SSID}"
LOG cyan "  MAC: \${_ALERT_CLIENT_CONNECTED_CLIENT_MAC_ADDRESS}"

exit 0
`;
    }

    if (id === 'alert_client_disconnected') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Alert triggered when a client disconnects from a Pineapple AP

ALERT "Client disconnected"
LOG yellow "Client disconnected"

exit 0
`;
    }

    if (id === 'alert_deauth') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Alert triggered on deauth flood detection

# Available environment variables:
#   \$_ALERT_DENIAL_MESSAGE                   — human-readable description
#   \$_ALERT_DENIAL_SOURCE_MAC_ADDRESS        — source of flood
#   \$_ALERT_DENIAL_DESTINATION_MAC_ADDRESS   — destination
#   \$_ALERT_DENIAL_AP_MAC_ADDRESS            — targeted AP
#   \$_ALERT_DENIAL_CLIENT_MAC_ADDRESS        — targeted client

ALERT "Deauth flood: \${_ALERT_DENIAL_SOURCE_MAC_ADDRESS}"
LOG red "Deauth flood detected!"
LOG cyan "  Source: \${_ALERT_DENIAL_SOURCE_MAC_ADDRESS}"
LOG cyan "  AP:     \${_ALERT_DENIAL_AP_MAC_ADDRESS}"
LOG cyan "  Client: \${_ALERT_DENIAL_CLIENT_MAC_ADDRESS}"

exit 0
`;
    }

    // ── Recon payload templates ──
    if (id === 'recon_ap') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Recon payload run against a discovered access point
# Category: reconnaissance

# Available AP environment variables:
#   \$_RECON_SELECTED_AP_SSID            — primary SSID
#   \$_RECON_SELECTED_AP_MAC_ADDRESS     — AP MAC / BSSID
#   \$_RECON_SELECTED_AP_CHANNEL         — advertised channel
#   \$_RECON_SELECTED_AP_ENCRYPTION_TYPE — encryption type
#   \$_RECON_SELECTED_AP_RSSI            — signal strength
#   \$_RECON_SELECTED_AP_OUI             — manufacturer
#   \$_RECON_SELECTED_AP_CLIENT_COUNT    — number of clients
#   \$_RECON_SELECTED_AP_FREQ            — frequency
#   \$_RECON_SELECTED_AP_PACKETS         — packet count

LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"

LOG green "=== AP Recon: \${_RECON_SELECTED_AP_SSID} ==="
LOG cyan "  BSSID:      \${_RECON_SELECTED_AP_MAC_ADDRESS}"
LOG cyan "  Channel:    \${_RECON_SELECTED_AP_CHANNEL}"
LOG cyan "  Encryption: \${_RECON_SELECTED_AP_ENCRYPTION_TYPE}"
LOG cyan "  Signal:     \${_RECON_SELECTED_AP_RSSI}"
LOG cyan "  OUI:        \${_RECON_SELECTED_AP_OUI}"
LOG cyan "  Clients:    \${_RECON_SELECTED_AP_CLIENT_COUNT}"

# Lock to AP's channel for focused capture
PINEAPPLE_EXAMINE_BSSID "\${_RECON_SELECTED_AP_MAC_ADDRESS}" 30

LOG green "Scan complete"
PINEAPPLE_EXAMINE_RESET

exit 0
`;
    }

    if (id === 'recon_client') {
        return `#!/bin/bash
# Title: ${name}
# Author:
# Description: Recon payload run against a discovered client
# Category: reconnaissance

# Available client environment variables (in addition to AP vars):
#   \$_RECON_SELECTED_CLIENT_MAC_ADDRESS    — client MAC
#   \$_RECON_SELECTED_CLIENT_OUI            — manufacturer
#   \$_RECON_SELECTED_CLIENT_PROBED_SSID    — primary probed SSID
#   \$_RECON_SELECTED_CLIENT_PROBED_SSIDS   — number of probed SSIDs
#   \$_RECON_SELECTED_CLIENT_RSSI           — signal strength
#   \$_RECON_SELECTED_CLIENT_FREQ           — frequency
#   \$_RECON_SELECTED_CLIENT_PACKETS        — packet count

LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"

LOG green "=== Client Recon ==="
LOG cyan "  Client MAC:  \${_RECON_SELECTED_CLIENT_MAC_ADDRESS}"
LOG cyan "  OUI:         \${_RECON_SELECTED_CLIENT_OUI}"
LOG cyan "  Probed SSID: \${_RECON_SELECTED_CLIENT_PROBED_SSID}"
LOG cyan "  Signal:      \${_RECON_SELECTED_CLIENT_RSSI}"
LOG cyan "  Connected AP: \${_RECON_SELECTED_AP_SSID} (\${_RECON_SELECTED_AP_MAC_ADDRESS})"

# Try to find client IP
CLIENT_IP=\$(FIND_CLIENT_IP "\${_RECON_SELECTED_CLIENT_MAC_ADDRESS}" 5)
if [ -n "\${CLIENT_IP}" ]; then
    LOG green "  Client IP: \${CLIENT_IP}"
fi

LOG green "Recon complete"

exit 0
`;
    }

    // ── User payload templates ──
    const header = `#!/bin/bash
# Title: ${name}
# Author:
# Description:
# Version: 1.0
# Category: general

`;
    const trap = `RUNNING=1
cleanup() { RUNNING=0; LOG green "=== STOPPED ==="; exit 0; }
trap cleanup INT TERM HUP QUIT

`;

    switch (id) {
        case 'basic': return header + trap + `LOG green "=== ${name} ==="
CONFIRMATION_DIALOG "Start?" || exit 0
LOG cyan "Running..."
# Your code here
LOG green "Done!"
exit 0
`;
        case 'recon': return header.replace('general', 'reconnaissance') + `LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"
` + trap + `LOG green "=== RECON ==="
CONFIRMATION_DIALOG "Start scan?" || exit 0
while [ \${RUNNING} -eq 1 ]; do
    LOG cyan "Scanning..."
    # scan code here
    sleep 5
done
exit 0
`;
        case 'wifi': return header.replace('general', 'reconnaissance') + trap + `LOG green "=== WiFi Audit ==="
for phy in /sys/class/ieee80211/phy*; do
    [ -d "\$phy" ] || continue
    P=\$(basename "\$phy")
    LOG cyan "\$P: \$(iw phy \$P info 2>/dev/null | grep -cE '\\* [0-9]+ MHz') channels"
done
exit 0
`;
        case 'bt': return header.replace('general', 'reconnaissance') + `LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"
` + trap + `LOG green "=== BT Scanner ==="
hciconfig hci0 up 2>/dev/null || { LOG red "No BT adapter!"; exit 1; }
CONFIRMATION_DIALOG "Start BLE scan?" || exit 0
while [ \${RUNNING} -eq 1 ]; do
    timeout 5 hcitool lescan 2>/dev/null | while read -r line; do
        LOG "  \$line"
    done
    sleep 2
done
exit 0
`;
        case 'exfil': return header.replace('general', 'exfiltration') + `LOOT_DIR="/root/loot/${name}"
mkdir -p "\${LOOT_DIR}"
` + trap + `LOG green "=== Data Collection ==="
CONFIRMATION_DIALOG "Start?" || exit 0
LOOT_FILE="\${LOOT_DIR}/\$(date +%Y%m%d_%H%M%S).json"
# collect data here
LOG green "Saved: \${LOOT_FILE}"
exit 0
`;
        case 'interactive': return header + trap + `LOG green "=== ${name} ==="
TARGET=\$(TEXT_PICKER "Enter target" "192.168.1.1") || exit 0
TIMEOUT=\$(NUMBER_PICKER "Timeout (seconds)" "30") || exit 0
CONFIRMATION_DIALOG "Run on \${TARGET} for \${TIMEOUT}s?" || exit 0
LOG cyan "Running scan on \${TARGET}..."
__sid=\$(START_SPINNER "Scanning...")
sleep \${TIMEOUT}
STOP_SPINNER \${__sid}
LOG green "Complete!"
VIBRATE short
exit 0
`;
        default: return header + trap + `# Your code here\nexit 0\n`;
    }
}

export function deactivate() {
    if (logStream) { logStream.kill(); logStream = null; }
    if (logChannel) { logChannel.dispose(); logChannel = null; }
    if (ssh) { ssh.dispose(); }
    if (payloads) { payloads.dispose(); }
}

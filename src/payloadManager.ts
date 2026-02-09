import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { SSHManager, getConfig } from './sshManager';
import { ClientChannel } from 'ssh2';

interface RunningPayload {
    name: string;
    remotePath: string;
    stream: ClientChannel;
    kill: () => void;
    startTime: number;
}

// ================================================================
// Interactive DuckyScript Shim
//
// Implements the official Hak5 WiFi Pineapple Pager DuckyScript API
// (https://docs.hak5.org/wifi-pineapple-pager/) so payloads can run
// interactively inside VS Code via native dialogs.
//
// How it works:
//   1. Payload calls e.g. CONFIRMATION_DIALOG "Continue?"
//   2. Shim outputs marker: @@PAGER_REQ|confirm|<id>|Continue?@@
//   3. Shim polls /tmp/_pager_resp_<id> every 0.3s
//   4. VS Code detects marker, shows native dialog to user
//   5. User clicks Yes/No (or types text, picks option)
//   6. VS Code writes response via SSH: echo "1" > /tmp/_pager_resp_<id>
//   7. Shim reads response, cleans up, returns result to script
// ================================================================

const DUCKY_SHIM = `
# ── DuckyScript constants (match real Pager firmware) ──
export DUCKYSCRIPT_USER_CONFIRMED=1
export DUCKYSCRIPT_USER_DENIED=0
export DUCKYSCRIPT_CANCELLED=1
export DUCKYSCRIPT_REJECTED=2
export DUCKYSCRIPT_ERROR=3

# ── Internal: save fd 1 (the SSH/PTY stream) as fd 3 ──
# When a function is called inside $() the subshell redirects fd 1 into
# a pipe so the parent can capture the return value.  Markers written to
# fd 1 would therefore vanish into the variable instead of reaching
# VS Code.  By duplicating the original stdout to fd 3 we can send
# markers there — they travel through the SSH channel to VS Code while
# the return value still goes to fd 1 (captured by the caller).
exec 3>&1

# ── Internal helpers ──
_PAGER_SEQ=0

# Wait for VS Code to write a response file for the given request id.
# Polls every 0.3s up to \$2 iterations (default 400 ≈ 120s).
_pager_wait_resp() {
    local id="\$1" timeout="\${2:-400}" elapsed=0
    local f="/tmp/_pager_resp_\${id}"
    while [ ! -f "\$f" ] && [ "\$elapsed" -lt "\$timeout" ]; do
        usleep 300000 2>/dev/null || sleep 1
        elapsed=\$((elapsed + 1))
    done
    if [ -f "\$f" ]; then
        cat "\$f"
        rm -f "\$f"
    else
        echo "__TIMEOUT__"
    fi
}

# ── LOG [color] "message" ──
# Color is optional.  Recognised names: red green blue cyan yellow
# magenta purple white orange.  Without a colour the text uses defaults.
LOG() {
    local color="" reset="\\033[0m"
    case "\$1" in
        red) color="\\033[31m"; shift;; green) color="\\033[32m"; shift;;
        blue) color="\\033[34m"; shift;; cyan) color="\\033[36m"; shift;;
        yellow) color="\\033[33m"; shift;; magenta|purple) color="\\033[35m"; shift;;
        white) color="\\033[37m"; shift;; orange) color="\\033[38;5;208m"; shift;;
    esac
    if [ -n "\$color" ]; then printf "%b%s%b\\n" "\$color" "\$*" "\$reset"
    else printf "%s\\n" "\$*"; fi
}

# ── ALERT "message" ──
# Non-blocking: displays alert and returns immediately.
# Since firmware 1.0.5 this always plays the configured alert ringtone.
ALERT() {
    printf "@@PAGER_REQ|alert|0|%s@@\\n" "\$*" >&3
}

# ── CONFIRMATION_DIALOG "prompt" ──
# Stdout: "1" (confirmed) or "0" (denied)
# Exit code: 0 on success, non-zero on cancel/reject/error
CONFIRMATION_DIALOG() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    printf "@@PAGER_REQ|confirm|%s|%s@@\\n" "\$id" "\$*" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        __REJECTED__) return \$DUCKYSCRIPT_REJECTED;;
        1|yes) printf "1"; return 0;;
        0|no)  printf "0"; return 0;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── TEXT_PICKER "prompt" "default_text" ──
# Stdout: user-entered text
# Exit code: 0 on success, non-zero on cancel
TEXT_PICKER() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local prompt="\${1:-}" default_val="\${2:-}"
    printf "@@PAGER_REQ|text|%s|%s||%s@@\\n" "\$id" "\$prompt" "\$default_val" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        __REJECTED__) return \$DUCKYSCRIPT_REJECTED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── IP_PICKER "prompt" "default_ip" ──
# Stdout: user-entered IPv4 address
# Exit code: 0 on success, non-zero on cancel
IP_PICKER() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local prompt="\${1:-}" default_val="\${2:-}"
    printf "@@PAGER_REQ|ip|%s|%s||%s@@\\n" "\$id" "\$prompt" "\$default_val" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        __REJECTED__) return \$DUCKYSCRIPT_REJECTED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── MAC_PICKER "prompt" "default_mac" ──
# Stdout: user-entered MAC address
# Exit code: 0 on success, non-zero on cancel
MAC_PICKER() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local prompt="\${1:-}" default_val="\${2:-}"
    printf "@@PAGER_REQ|mac|%s|%s||%s@@\\n" "\$id" "\$prompt" "\$default_val" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        __REJECTED__) return \$DUCKYSCRIPT_REJECTED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── NUMBER_PICKER "prompt" "default_number" ──
# Stdout: user-entered number
# Exit code: 0 on success, non-zero on cancel
NUMBER_PICKER() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local prompt="\${1:-}" default_val="\${2:-}"
    printf "@@PAGER_REQ|number|%s|%s||%s@@\\n" "\$id" "\$prompt" "\$default_val" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        __REJECTED__) return \$DUCKYSCRIPT_REJECTED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── ERROR_DIALOG "message" ──
# Blocking: waits for user to dismiss.
# Should usually be last thing called before exit.
ERROR_DIALOG() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    printf "@@PAGER_REQ|error|%s|%s@@\\n" "\$id" "\$*" >&3
    _pager_wait_resp "\$id" > /dev/null
}

# ── PROMPT "message" ──
# Blocking: waits for user to acknowledge
PROMPT() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    printf "@@PAGER_REQ|prompt|%s|%s@@\\n" "\$id" "\$*" >&3
    _pager_wait_resp "\$id" > /dev/null
}

# ── START_SPINNER "message" ──
# Stdout: spinner ID (pass to STOP_SPINNER)
# Pre-1.0.5 firmware bug: multi-word messages could create uncancellable
# spinners.  The VS Code shim does not have this limitation.
START_SPINNER() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local sid="spinner_\${$}_\${_PAGER_SEQ}"
    printf "@@PAGER_REQ|spinner_start|%s|%s@@\\n" "\$sid" "\$*" >&3
    printf "%s" "\$sid"
}

# ── STOP_SPINNER id ──
STOP_SPINNER() {
    printf "@@PAGER_REQ|spinner_stop|%s|@@\\n" "\${1:-0}" >&3
}

# ── VIBRATE "pattern" ──
# Vibration-only (no audio).  Accepts RTTTL pattern/name or duration ms.
# Errors on real device if another ringtone/vibration is playing.
VIBRATE() {
    printf "@@PAGER_REQ|vibrate|0|%s@@\\n" "\${1:-}" >&3
}

# ── RINGTONE {--vibrate} "name_or_rtttl" ──
# Plays a ringtone from /root/ringtones/ or inline RTTTL string.
# Optional --vibrate flag adds haptic feedback.
# Errors on real device if another ringtone is already playing.
RINGTONE() {
    local vibrate=""
    if [ "\$1" = "--vibrate" ]; then vibrate="(+vibrate) "; shift; fi
    printf "@@PAGER_REQ|ringtone|0|%s%s@@\\n" "\$vibrate" "\$*" >&3
}

# ── WAIT_FOR_BUTTON_PRESS [BUTTON] ──
# Blocking: waits for a specific button (ANY/UP/DOWN/LEFT/RIGHT/A/B)
# Stdout: the button that was pressed
WAIT_FOR_BUTTON_PRESS() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local btn="\${1:-ANY}"
    printf "@@PAGER_REQ|button_press|%s|%s@@\\n" "\$id" "\$btn" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── WAIT_FOR_INPUT ──
# Blocking: waits for any button press
# Stdout: the button that was pressed
WAIT_FOR_INPUT() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    printf "@@PAGER_REQ|wait_input|%s|@@\\n" "\$id" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}

# ── PAYLOAD_GET_CONFIG payload_name option ──
# UCI-backed on real firmware; persists across upgrades.
# Falls back to /tmp file when firmware helpers are unavailable.
PAYLOAD_GET_CONFIG() {
    local payload_name="\${1:-}" option="\${2:-}"
    # Try native firmware command first (available when firmware runtime is loaded)
    if command -v _payload_get_config >/dev/null 2>&1; then
        _payload_get_config "\$payload_name" "\$option"
        return \$?
    fi
    # Try UCI directly (available on device, persists across sessions)
    if command -v uci >/dev/null 2>&1; then
        uci get "pager_payload.\${payload_name}.\${option}" 2>/dev/null || true
        return 0
    fi
    # Fallback: flat file in /tmp (dev only — does not persist across reboots)
    local f="/tmp/_pager_config_\${payload_name}"
    if [ -f "\$f" ]; then
        grep "^\${option}=" "\$f" 2>/dev/null | head -1 | cut -d= -f2-
    fi
}

# ── PAYLOAD_SET_CONFIG payload_name option value ──
PAYLOAD_SET_CONFIG() {
    local payload_name="\${1:-}" option="\${2:-}" value="\${3:-}"
    if command -v _payload_set_config >/dev/null 2>&1; then
        _payload_set_config "\$payload_name" "\$option" "\$value"
        return \$?
    fi
    if command -v uci >/dev/null 2>&1; then
        uci set "pager_payload.\${payload_name}.\${option}=\${value}" 2>/dev/null
        uci commit pager_payload 2>/dev/null
        return 0
    fi
    local f="/tmp/_pager_config_\${payload_name}"
    if [ -f "\$f" ]; then
        grep -v "^\${option}=" "\$f" > "\${f}.tmp" 2>/dev/null || true
        mv "\${f}.tmp" "\$f"
    fi
    printf "%s=%s\\n" "\$option" "\$value" >> "\$f"
}

# ── PAYLOAD_DEL_CONFIG payload_name option ──
PAYLOAD_DEL_CONFIG() {
    local payload_name="\${1:-}" option="\${2:-}"
    if command -v _payload_del_config >/dev/null 2>&1; then
        _payload_del_config "\$payload_name" "\$option"
        return \$?
    fi
    if command -v uci >/dev/null 2>&1; then
        uci delete "pager_payload.\${payload_name}.\${option}" 2>/dev/null || true
        uci commit pager_payload 2>/dev/null
        return 0
    fi
    local f="/tmp/_pager_config_\${payload_name}"
    if [ -f "\$f" ]; then
        grep -v "^\${option}=" "\$f" > "\${f}.tmp" 2>/dev/null || true
        mv "\${f}.tmp" "\$f"
    fi
}

# ── LED color pattern ──
# No-op in VS Code but logged so user sees state changes.
# Accepts: LED color pattern  |  LED SETUP/ATTACK/FINISH/FAIL/OFF/CLEANUP
#          LED R n G n B n    (RGB mode used by some payloads)
LED() {
    printf "@@PAGER_REQ|led|0|%s@@\\n" "\$*" >&3
}

# ── BATTERY_PERCENT / BATTERY_CHARGING (firmware 1.0.7+) ──
# Simulated in VS Code: always fully charged on USB power.
BATTERY_PERCENT() {
    printf "100"
}
BATTERY_CHARGING() {
    printf "1"
}

# ── DISABLE_DISPLAY / ENABLE_DISPLAY ──
DISABLE_DISPLAY() { printf "@@PAGER_REQ|info|0|Display disabled@@\\n" >&3; }
ENABLE_DISPLAY()  { printf "@@PAGER_REQ|info|0|Display enabled@@\\n" >&3; }

# ── DPADLED color / DPADLED_CONFIG color ──
DPADLED()        { printf "@@PAGER_REQ|info|0|DPADLED: %s@@\\n" "\$*" >&3; }
DPADLED_CONFIG() { printf "@@PAGER_REQ|info|0|DPADLED_CONFIG: %s@@\\n" "\$*" >&3; }

# ── Backward-compat aliases ──
TEXT_INPUT_DIALOG() { TEXT_PICKER "\$@"; }
IP_INPUT_DIALOG()  { IP_PICKER "\$@"; }
SELECT_DIALOG() {
    _PAGER_SEQ=\$((_PAGER_SEQ + 1))
    local id="\${$}_\${_PAGER_SEQ}"
    local prompt="\$1"; shift
    local opts=""
    for o in "\$@"; do
        if [ -n "\$opts" ]; then opts="\${opts}||\$o"; else opts="\$o"; fi
    done
    printf "@@PAGER_REQ|select|%s|%s||%s@@\\n" "\$id" "\$prompt" "\$opts" >&3
    local resp=\$(_pager_wait_resp "\$id")
    case "\$resp" in
        __TIMEOUT__) return \$DUCKYSCRIPT_ERROR;;
        __CANCEL__)  return \$DUCKYSCRIPT_CANCELLED;;
        *) printf "%s" "\$resp"; return 0;;
    esac
}
`;

// ================================================================
// Payload Manager
// ================================================================

export class PayloadManager {
    private running: RunningPayload | null = null;
    private outputChannel: vscode.OutputChannel;
    private _onRunStateChange = new vscode.EventEmitter<boolean>();
    public onRunStateChange = this._onRunStateChange.event;
    private diagnostics: vscode.DiagnosticCollection;
    private deployedHashes: Map<string, string> = new Map();
    // Track active spinner for status bar
    private spinnerStatus: vscode.StatusBarItem | null = null;

    constructor(private ssh: SSHManager) {
        this.outputChannel = vscode.window.createOutputChannel('Pager Payload', 'shellscript');
        this.diagnostics = vscode.languages.createDiagnosticCollection('pager-payload');
    }

    // ================================================================
    // Path Resolution — fully automatic, no prompts
    // ================================================================

    parsePayloadMeta(content: string): { category: string; name: string } {
        const cfg = getConfig();
        let category = cfg.defaultCategory;
        const catMatch = content.match(/^#\s*Category:\s*(.+)/mi);
        if (catMatch) { category = catMatch[1].trim().toLowerCase().replace(/[\s-]+/g, '_'); }
        let name = '';
        const titleMatch = content.match(/^#\s*Title:\s*(.+)/mi);
        if (titleMatch) { name = titleMatch[1].trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, ''); }
        return { category, name };
    }

    getDeployPath(localUri: vscode.Uri): { remotePath: string; category: string; payloadName: string } {
        const cfg = getConfig();
        const content = fs.readFileSync(localUri.fsPath, 'utf-8');
        const meta = this.parsePayloadMeta(content);
        const fileName = path.basename(localUri.fsPath);
        const dirName = path.basename(path.dirname(localUri.fsPath));
        const parentDir = path.basename(path.dirname(path.dirname(localUri.fsPath)));

        let payloadName = '';
        if (fileName === 'payload.sh') { payloadName = dirName; }
        else if (fileName.endsWith('.sh')) { payloadName = path.basename(fileName, '.sh'); }
        if (!payloadName) { payloadName = meta.name || dirName || 'unnamed'; }

        let category = meta.category;
        const knownCats = ['general', 'reconnaissance', 'exfiltration', 'interception', 'remote_access', 'games', 'prank'];
        const fullPath = localUri.fsPath.replace(/\\/g, '/').toLowerCase();
        for (const cat of knownCats) { if (fullPath.includes(`/${cat}/`)) { category = cat; break; } }
        if (knownCats.includes(parentDir.toLowerCase())) { category = parentDir.toLowerCase(); }

        return { remotePath: `${cfg.payloadBasePath}/${category}/${payloadName}/payload.sh`, category, payloadName };
    }

    // ================================================================
    // Smart Deploy — skip if unchanged
    // ================================================================

    private hashContent(content: string): string {
        return crypto.createHash('md5').update(content).digest('hex');
    }

    async smartDeploy(uri?: vscode.Uri): Promise<{ remotePath: string; deployed: boolean } | undefined> {
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { vscode.window.showWarningMessage('No file open'); return undefined; }
            uri = editor.document.uri;
        }
        let content = fs.readFileSync(uri.fsPath, 'utf-8');
        const cfg = getConfig();
        if (cfg.autoFixLineEndings) { content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n'); }

        const hash = this.hashContent(content);
        const deployInfo = this.getDeployPath(uri);

        if (this.deployedHashes.get(deployInfo.remotePath) === hash) {
            this.outputChannel.appendLine(`[pager] ⚡ Unchanged — skip deploy`);
            return { remotePath: deployInfo.remotePath, deployed: false };
        }

        const result = await this.deploy(uri);
        if (result) {
            this.deployedHashes.set(deployInfo.remotePath, hash);
            return { remotePath: result, deployed: true };
        }
        return undefined;
    }

    // ================================================================
    // Deploy
    // ================================================================

    async deploy(uri?: vscode.Uri): Promise<string | undefined> {
        if (!this.ssh.connected) { if (!(await this.ssh.connect())) { return undefined; } }
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { vscode.window.showWarningMessage('No file open'); return undefined; }
            uri = editor.document.uri;
        }

        const cfg = getConfig();
        let content = fs.readFileSync(uri.fsPath, 'utf-8');
        const deployInfo = this.getDeployPath(uri);

        if (cfg.autoFixLineEndings) {
            const orig = content;
            content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
            if (orig !== content) { this.outputChannel.appendLine('[pager] Fixed CRLF → LF'); }
        }

        try {
            await this.ssh.uploadContent(content, deployInfo.remotePath);
            await this.ssh.exec(`chmod +x "${deployInfo.remotePath}" && sed -i 's/\\r$//' "${deployInfo.remotePath}"`);
            const size = await this.ssh.exec(`wc -c < "${deployInfo.remotePath}"`);
            this.outputChannel.appendLine(`[pager] ✅ Deployed: ${deployInfo.category}/${deployInfo.payloadName} (${size.trim()}B)`);
            vscode.window.showInformationMessage(`🍍 Deployed: ${deployInfo.category}/${deployInfo.payloadName}`);
            this.deployedHashes.set(deployInfo.remotePath, this.hashContent(content));
            return deployInfo.remotePath;
        } catch (err: any) {
            vscode.window.showErrorMessage(`Deploy failed: ${err.message}`);
            this.outputChannel.appendLine(`[pager] ❌ Deploy failed: ${err.message}`);
            return undefined;
        }
    }

    // ================================================================
    // Deploy Folder — upload all files in the payload directory
    // ================================================================

    async deployFolder(uri?: vscode.Uri): Promise<string | undefined> {
        if (!this.ssh.connected) { if (!(await this.ssh.connect())) { return undefined; } }
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { vscode.window.showWarningMessage('No file open'); return undefined; }
            uri = editor.document.uri;
        }

        const localFile = uri.fsPath;
        const localDir = path.basename(localFile) === 'payload.sh' ? path.dirname(localFile) : localFile;
        if (!fs.existsSync(localDir) || !fs.statSync(localDir).isDirectory()) {
            vscode.window.showWarningMessage('Cannot find payload directory');
            return undefined;
        }

        const cfg = getConfig();
        const content = fs.readFileSync(path.join(localDir, 'payload.sh'), 'utf-8');
        const meta = this.parsePayloadMeta(content);
        const payloadName = path.basename(localDir);
        const category = meta.category;
        const remoteDir = `${cfg.payloadBasePath}/${category}/${payloadName}`;

        try {
            const count = await this.ssh.uploadDirectory(localDir, remoteDir);
            await this.ssh.exec(`chmod +x "${remoteDir}/payload.sh" 2>/dev/null; find "${remoteDir}" -name "*.sh" -exec chmod +x {} \\; 2>/dev/null || true`);
            this.outputChannel.appendLine(`[pager] Deployed folder: ${count} files to ${remoteDir}`);
            vscode.window.showInformationMessage(`Deployed ${count} files to ${category}/${payloadName}`);
            return `${remoteDir}/payload.sh`;
        } catch (err: any) {
            vscode.window.showErrorMessage(`Folder deploy failed: ${err.message}`);
            return undefined;
        }
    }

    // ================================================================
    // Run variants
    // ================================================================

    async run(remotePath?: string, uri?: vscode.Uri): Promise<void> {
        if (!this.ssh.connected) { if (!(await this.ssh.connect())) { return; } }
        if (!remotePath && uri) { remotePath = await this.deploy(uri); }
        else if (!remotePath) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { vscode.window.showWarningMessage('No payload open'); return; }
            remotePath = await this.deploy(editor.document.uri);
        }
        if (remotePath) { await this._executePayload(remotePath); }
    }

    async runRemote(remotePath: string): Promise<void> {
        if (!this.ssh.connected) { if (!(await this.ssh.connect())) { return; } }
        await this._executePayload(remotePath);
    }

    async runOnDevice(uri?: vscode.Uri): Promise<void> {
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (!editor) { vscode.window.showWarningMessage('No file open'); return; }
            uri = editor.document.uri;
        }
        if (!this.ssh.connected) { if (!(await this.ssh.connect())) { return; } }
        const deployInfo = this.getDeployPath(uri);
        const exists = await this.ssh.exists(deployInfo.remotePath);
        if (!exists) {
            const action = await vscode.window.showWarningMessage(
                `${deployInfo.payloadName} not on device. Deploy first?`, 'Deploy & Run', 'Cancel'
            );
            if (action === 'Deploy & Run') { await this.run(undefined, uri); }
            return;
        }
        await this._executePayload(deployInfo.remotePath);
    }

    async smartDeployAndRun(uri?: vscode.Uri): Promise<void> {
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (editor) { uri = editor.document.uri; }
        }
        if (!uri) { vscode.window.showWarningMessage('No payload open'); return; }
        const result = await this.smartDeploy(uri);
        if (result) { await this._executePayload(result.remotePath); }
    }

    async deployAndRun(uri?: vscode.Uri): Promise<void> {
        if (!uri) {
            const editor = vscode.window.activeTextEditor;
            if (editor) { uri = editor.document.uri; }
        }
        if (!uri) { vscode.window.showWarningMessage('No payload open'); return; }
        const remotePath = await this.deploy(uri);
        if (remotePath) { await this._executePayload(remotePath); }
    }

    // ================================================================
    // Core Execution — with interactive dialog handling
    // ================================================================

    private async _executePayload(remotePath: string): Promise<void> {
        if (this.running) { await this.stop(); }

        const cfg = getConfig();
        const payloadName = path.basename(path.dirname(remotePath));

        this.outputChannel.clear();
        if (cfg.showOutputOnRun) { this.outputChannel.show(true); }

        this.outputChannel.appendLine(`${'═'.repeat(50)}`);
        this.outputChannel.appendLine(`  Running: ${payloadName}`);
        this.outputChannel.appendLine(`  Path:    ${remotePath}`);
        this.outputChannel.appendLine(`  Time:    ${new Date().toLocaleTimeString()}`);
        this.outputChannel.appendLine(`  Mode:    Interactive (dialogs enabled)`);
        this.outputChannel.appendLine(`${'═'.repeat(50)}`);
        this.outputChannel.appendLine('');

        try {
            // Deploy shim via base64 upload (heredoc gets mangled by ash/dropbear)
            const shimPath = '/tmp/_pager_ducky_shim.sh';
            const combinedPath = '/tmp/_pager_run.sh';
            await this.ssh.exec('rm -f /tmp/_pager_resp_* /tmp/_pager_run.sh 2>/dev/null || true');
            await this.ssh.uploadContent(DUCKY_SHIM, shimPath);

            // Verify shim was uploaded correctly
            const shimSize = await this.ssh.exec(`wc -c < ${shimPath} 2>/dev/null || echo 0`);
            if (parseInt(shimSize.trim()) < 100) {
                throw new Error(`Shim upload failed (size: ${shimSize.trim()} bytes). Check SSH connection.`);
            }

            // Combine shim + payload into a single script to avoid sourcing chain issues
            // This ensures functions are always defined in the same execution context
            const payloadDir = remotePath.substring(0, remotePath.lastIndexOf('/'));
            await this.ssh.exec(`cat ${shimPath} "${remotePath}" > ${combinedPath} && chmod +x ${combinedPath}`);

            const cmd = `export PAYLOAD_HOME="${payloadDir}" && cd "$PAYLOAD_HOME" && . ${combinedPath} 2>&1; echo "[PAGER_EXIT:$?]"`;

            const { stream, kill } = await this.ssh.execStream(
                cmd,
                (line: string) => { this.handleOutputLine(line); },
                (line: string) => { this.outputChannel.appendLine(`[stderr] ${line}`); }
            );

            this.running = { name: payloadName, remotePath, stream, kill, startTime: Date.now() };
            vscode.commands.executeCommand('setContext', 'pager.payloadRunning', true);
            this._onRunStateChange.fire(true);

            stream.on('close', (code: number) => {
                this.clearSpinner();
                const dur = ((Date.now() - (this.running?.startTime || Date.now())) / 1000).toFixed(1);
                this.outputChannel.appendLine('');
                this.outputChannel.appendLine(`${'─'.repeat(50)}`);
                this.outputChannel.appendLine(`  Finished: ${payloadName} (${dur}s, exit: ${code ?? 0})`);
                this.outputChannel.appendLine(`${'─'.repeat(50)}`);
                this.running = null;
                vscode.commands.executeCommand('setContext', 'pager.payloadRunning', false);
                this._onRunStateChange.fire(false);
                if (code === 0 || code === null) {
                    vscode.window.showInformationMessage(`🍍 ${payloadName} completed (${dur}s)`);
                } else {
                    vscode.window.showWarningMessage(`⚠️ ${payloadName} exited with code ${code}`);
                }
            });

            if (cfg.runTimeout > 0) {
                setTimeout(() => {
                    if (this.running?.remotePath === remotePath) {
                        this.outputChannel.appendLine(`\n[pager] ⏱️ Timeout after ${cfg.runTimeout}s`);
                        this.stop();
                    }
                }, cfg.runTimeout * 1000);
            }
        } catch (err: any) {
            this.outputChannel.appendLine(`\n[pager] ❌ Run failed: ${err.message}`);
            vscode.window.showErrorMessage(`Run failed: ${err.message}`);
            this.running = null;
            vscode.commands.executeCommand('setContext', 'pager.payloadRunning', false);
            this._onRunStateChange.fire(false);
        }
    }

    // ================================================================
    // Interactive Dialog Handler
    //
    // Detects @@PAGER_REQ|type|id|prompt[||options]@@ markers in output,
    // shows VS Code native dialogs, sends response back via SSH
    // ================================================================

    private handleOutputLine(rawLine: string): void {
        // Strip ANSI codes for parsing
        const stripped = rawLine.replace(/\x1b\[[0-9;]*m/g, '').replace(/\r/g, '').trim();
        if (!stripped) { return; }

        // Check for dialog request marker
        const reqMatch = stripped.match(/@@PAGER_REQ\|([^|]+)\|([^|]+)\|(.*)@@/);
        if (reqMatch) {
            const type = reqMatch[1];
            const id = reqMatch[2];
            const payload = reqMatch[3];

            // Don't show the raw marker in output — show a formatted version instead
            this.handleDialogRequest(type, id, payload);
            return;
        }

        // Check for exit code marker
        if (stripped.includes('[PAGER_EXIT:')) { return; }

        // Normal output — display it (keep ANSI colors for the channel)
        const cleaned = rawLine.replace(/\r/g, '').trim();
        if (cleaned) { this.outputChannel.appendLine(cleaned); }
    }

    private async handleDialogRequest(type: string, id: string, payload: string): Promise<void> {
        // Parse prompt and default value (separated by ||)
        const parts = payload.split('||');
        const prompt = parts[0] || '';
        const defaultValue = parts[1] || '';
        // For select dialog, options are the remaining || parts
        const selectOptions = parts.slice(1);

        switch (type) {
            case 'confirm':
                this.outputChannel.appendLine(`  [CONFIRMATION_DIALOG] ${prompt}`);
                await this.handleConfirm(id, prompt);
                break;

            case 'text':
                this.outputChannel.appendLine(`  [TEXT_PICKER] ${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}`);
                await this.handleTextInput(id, prompt, defaultValue);
                break;

            case 'ip':
                this.outputChannel.appendLine(`  [IP_PICKER] ${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}`);
                await this.handleIpInput(id, prompt, defaultValue);
                break;

            case 'mac':
                this.outputChannel.appendLine(`  [MAC_PICKER] ${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}`);
                await this.handleMacPicker(id, prompt, defaultValue);
                break;

            case 'number':
                this.outputChannel.appendLine(`  [NUMBER_PICKER] ${prompt}${defaultValue ? ` (default: ${defaultValue})` : ''}`);
                await this.handleNumberInput(id, prompt, defaultValue);
                break;

            case 'select':
                this.outputChannel.appendLine(`  [SELECT_DIALOG] ${prompt} [${selectOptions.join(', ')}]`);
                await this.handleSelect(id, prompt, selectOptions);
                break;

            case 'alert':
                this.outputChannel.appendLine(`  [ALERT] ${prompt}`);
                vscode.window.showInformationMessage(`${prompt}`);
                break;

            case 'error':
                this.outputChannel.appendLine(`  [ERROR_DIALOG] ${prompt}`);
                await this.handleError(id, prompt);
                break;

            case 'prompt':
                this.outputChannel.appendLine(`  [PROMPT] ${prompt}`);
                await this.handlePrompt(id, prompt);
                break;

            case 'button_press':
                this.outputChannel.appendLine(`  [WAIT_FOR_BUTTON_PRESS] waiting for: ${prompt}`);
                await this.handleButtonPress(id, prompt);
                break;

            case 'wait_input':
                this.outputChannel.appendLine(`  [WAIT_FOR_INPUT] waiting for any button...`);
                await this.handleWaitInput(id);
                break;

            case 'spinner_start':
                this.showSpinner(prompt, id);
                break;

            case 'spinner_stop':
                this.clearSpinner();
                break;

            case 'vibrate':
                this.outputChannel.appendLine(`  [VIBRATE] ${prompt}`);
                break;

            case 'ringtone':
                this.outputChannel.appendLine(`  [RINGTONE] ${prompt}`);
                break;

            case 'led':
                this.outputChannel.appendLine(`  [LED] ${prompt}`);
                break;

            case 'info':
                this.outputChannel.appendLine(`  [info] ${prompt}`);
                break;

            default:
                this.outputChannel.appendLine(`  [${type}] ${prompt}`);
        }
    }

    // ---- Individual dialog handlers ----

    private async handleConfirm(id: string, prompt: string): Promise<void> {
        const answer = await vscode.window.showInformationMessage(
            prompt, { modal: true }, 'Yes', 'No'
        );
        if (answer === undefined) {
            // Dialog dismissed without choice — treat as cancelled
            this.outputChannel.appendLine(`  -> cancelled`);
            await this.sendResponse(id, '__CANCEL__');
        } else if (answer === 'Yes') {
            this.outputChannel.appendLine(`  -> confirmed`);
            await this.sendResponse(id, '1');
        } else {
            this.outputChannel.appendLine(`  -> denied`);
            await this.sendResponse(id, '0');
        }
    }

    private async handleTextInput(id: string, prompt: string, defaultValue: string): Promise<void> {
        const value = await vscode.window.showInputBox({
            prompt: prompt,
            value: defaultValue || undefined,
            placeHolder: 'Enter text...',
        });
        if (value === undefined) {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        } else {
            this.outputChannel.appendLine(`  -> "${value}"`);
            await this.sendResponse(id, value);
        }
    }

    private async handleIpInput(id: string, prompt: string, defaultValue: string): Promise<void> {
        const value = await vscode.window.showInputBox({
            prompt: prompt,
            value: defaultValue || undefined,
            placeHolder: '192.168.1.1',
            validateInput: (v: string) => {
                if (!v) { return null; }
                const parts = v.split('.');
                if (parts.length !== 4) { return 'Enter valid IPv4 (e.g. 192.168.1.1)'; }
                for (const p of parts) {
                    const n = parseInt(p);
                    if (isNaN(n) || n < 0 || n > 255) { return 'Each octet must be 0-255'; }
                }
                return null;
            }
        });
        if (value === undefined) {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        } else {
            this.outputChannel.appendLine(`  -> ${value}`);
            await this.sendResponse(id, value);
        }
    }

    private async handleMacPicker(id: string, prompt: string, defaultValue: string): Promise<void> {
        const value = await vscode.window.showInputBox({
            prompt: prompt,
            value: defaultValue || undefined,
            placeHolder: 'AA:BB:CC:DD:EE:FF',
            validateInput: (v: string) => {
                if (!v) { return null; }
                if (/^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/.test(v)) { return null; }
                return 'Enter valid MAC address (e.g. AA:BB:CC:DD:EE:FF)';
            }
        });
        if (value === undefined) {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        } else {
            this.outputChannel.appendLine(`  -> ${value}`);
            await this.sendResponse(id, value);
        }
    }

    private async handleNumberInput(id: string, prompt: string, defaultValue: string): Promise<void> {
        const value = await vscode.window.showInputBox({
            prompt: prompt,
            value: defaultValue || undefined,
            placeHolder: 'Enter a number...',
            validateInput: (v: string) => {
                if (!v) { return null; }
                if (/^-?\d+(\.\d+)?$/.test(v)) { return null; }
                return 'Enter a valid number';
            }
        });
        if (value === undefined) {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        } else {
            this.outputChannel.appendLine(`  -> ${value}`);
            await this.sendResponse(id, value);
        }
    }

    private async handleSelect(id: string, prompt: string, options: string[]): Promise<void> {
        const cleanOptions = options.filter(o => o.trim());
        if (cleanOptions.length === 0) {
            await this.sendResponse(id, '__CANCEL__');
            return;
        }

        const picked = await vscode.window.showQuickPick(cleanOptions, {
            placeHolder: prompt,
            title: 'Select Option'
        });

        if (picked) {
            this.outputChannel.appendLine(`  -> ${picked}`);
            await this.sendResponse(id, picked);
        } else {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        }
    }

    private async handleError(id: string, prompt: string): Promise<void> {
        await vscode.window.showErrorMessage(prompt, 'OK');
        this.outputChannel.appendLine(`  -> dismissed`);
        await this.sendResponse(id, 'ok');
    }

    private async handlePrompt(id: string, prompt: string): Promise<void> {
        await vscode.window.showInformationMessage(prompt, { modal: true }, 'Continue');
        this.outputChannel.appendLine(`  -> continue`);
        await this.sendResponse(id, 'ok');
    }

    private async handleButtonPress(id: string, buttonName: string): Promise<void> {
        // Official Pager buttons: UP, DOWN, LEFT, RIGHT, A, B
        const buttons = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B'];
        const target = buttonName.toUpperCase().trim();

        if (target && target !== 'ANY' && buttons.includes(target)) {
            // Waiting for a specific button — just show a modal prompt
            const action = await vscode.window.showInformationMessage(
                `Payload waiting for: ${target} button press`, { modal: true }, `Press ${target}`
            );
            if (!action) {
                this.outputChannel.appendLine(`  -> (cancelled)`);
                await this.sendResponse(id, '__CANCEL__');
            } else {
                this.outputChannel.appendLine(`  -> ${target}`);
                await this.sendResponse(id, target);
            }
        } else {
            // Waiting for any button — show picker
            const picked = await vscode.window.showQuickPick(buttons, {
                placeHolder: 'Simulate button press',
                title: 'WAIT_FOR_BUTTON_PRESS'
            });
            if (!picked) {
                this.outputChannel.appendLine(`  -> (cancelled)`);
                await this.sendResponse(id, '__CANCEL__');
            } else {
                this.outputChannel.appendLine(`  -> ${picked}`);
                await this.sendResponse(id, picked);
            }
        }
    }

    private async handleWaitInput(id: string): Promise<void> {
        const buttons = ['UP', 'DOWN', 'LEFT', 'RIGHT', 'A', 'B'];
        const picked = await vscode.window.showQuickPick(buttons, {
            placeHolder: 'Simulate button press (WAIT_FOR_INPUT)',
            title: 'Press any button'
        });
        if (!picked) {
            this.outputChannel.appendLine(`  -> (cancelled)`);
            await this.sendResponse(id, '__CANCEL__');
        } else {
            this.outputChannel.appendLine(`  -> ${picked}`);
            await this.sendResponse(id, picked);
        }
    }

    // ---- Response sender ----

    private async sendResponse(id: string, value: string): Promise<void> {
        if (!this.ssh.connected) { return; }
        try {
            // Write response to file that the shim is polling
            // Escape single quotes in value
            const escaped = value.replace(/'/g, "'\\''");
            await this.ssh.exec(`printf '%s' '${escaped}' > /tmp/_pager_resp_${id}`);
        } catch (err: any) {
            this.outputChannel.appendLine(`[pager] ⚠️ Failed to send response: ${err.message}`);
        }
    }

    // ---- Spinner ----

    private showSpinner(text: string, _id?: string): void {
        this.clearSpinner();
        this.spinnerStatus = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
        this.spinnerStatus.text = `$(sync~spin) ${text}`;
        this.spinnerStatus.tooltip = 'Pager payload working...';
        this.spinnerStatus.show();
        this.outputChannel.appendLine(`  ⏳ ${text}`);
    }

    private clearSpinner(): void {
        if (this.spinnerStatus) {
            this.spinnerStatus.dispose();
            this.spinnerStatus = null;
        }
    }

    // ================================================================
    // Stop
    // ================================================================

    async stop(): Promise<void> {
        if (!this.running) { vscode.window.showInformationMessage('No payload running'); return; }
        const name = this.running.name;
        this.outputChannel.appendLine(`\n[pager] 🛑 Stopping ${name}...`);
        this.running.kill();
        try { await this.ssh.exec('pkill -f "payload.sh" 2>/dev/null; rm -f /tmp/_pager_resp_* /tmp/_pager_ducky_shim.sh /tmp/_pager_run.sh 2>/dev/null || true'); } catch {}
        this.clearSpinner();
        this.running = null;
        vscode.commands.executeCommand('setContext', 'pager.payloadRunning', false);
        this._onRunStateChange.fire(false);
        vscode.window.showInformationMessage(`🛑 Stopped: ${name}`);
    }

    // ================================================================
    // Validation & Utilities
    // ================================================================

    validatePayload(content: string, uri: vscode.Uri): boolean {
        const diags: vscode.Diagnostic[] = [];
        const lines = content.split('\n');
        if (!lines[0]?.startsWith('#!/bin/')) {
            diags.push(new vscode.Diagnostic(new vscode.Range(0, 0, 0, lines[0]?.length || 0),
                'Missing shebang (#!/bin/bash)', vscode.DiagnosticSeverity.Warning));
        }
        if (content.includes('\r\n')) {
            diags.push(new vscode.Diagnostic(new vscode.Range(0, 0, 0, 1),
                'Windows CRLF — auto-fixed on deploy', vscode.DiagnosticSeverity.Warning));
        }
        const duckyCmds = [
            // UI Dialogs & Pickers
            'LOG', 'ALERT', 'PROMPT', 'ERROR_DIALOG', 'CONFIRMATION_DIALOG',
            'TEXT_PICKER', 'IP_PICKER', 'MAC_PICKER', 'NUMBER_PICKER',
            'START_SPINNER', 'STOP_SPINNER',
            'WAIT_FOR_BUTTON_PRESS', 'WAIT_FOR_INPUT',
            'VIBRATE', 'RINGTONE',
            // LED & Display
            'LED', 'DPADLED', 'DPADLED_CONFIG', 'ENABLE_DISPLAY', 'DISABLE_DISPLAY',
            // Battery
            'BATTERY_PERCENT', 'BATTERY_CHARGING',
            // Payload Config
            'PAYLOAD_GET_CONFIG', 'PAYLOAD_SET_CONFIG', 'PAYLOAD_DEL_CONFIG',
            // WiFi Operations
            'WIFI_CONNECT', 'WIFI_DISCONNECT', 'WIFI_CLEAR', 'WIFI_WAIT',
            'WIFI_OPEN_AP', 'WIFI_OPEN_AP_HIDE', 'WIFI_OPEN_AP_CLEAR', 'WIFI_OPEN_AP_DISABLE',
            'WIFI_WPA_AP', 'WIFI_WPA_AP_HIDE', 'WIFI_WPA_AP_CLEAR', 'WIFI_WPA_AP_DISABLE',
            'WIFI_MGMT_AP', 'WIFI_MGMT_AP_HIDE', 'WIFI_MGMT_AP_CLEAR', 'WIFI_MGMT_AP_DISABLE',
            'WIFI_PCAP_START', 'WIFI_PCAP_STOP',
            // PineAP / Recon
            'PINEAPPLE_SSID_POOL_ADD', 'PINEAPPLE_SSID_POOL_ADD_FILE',
            'PINEAPPLE_SSID_POOL_LIST', 'PINEAPPLE_SSID_POOL_DELETE', 'PINEAPPLE_SSID_POOL_CLEAR',
            'PINEAPPLE_SSID_POOL_START', 'PINEAPPLE_SSID_POOL_STOP',
            'PINEAPPLE_SSID_POOL_COLLECT_START', 'PINEAPPLE_SSID_POOL_COLLECT_STOP',
            'PINEAPPLE_MIMIC_ENABLE', 'PINEAPPLE_MIMIC_DISABLE',
            'PINEAPPLE_DEVICE_FILTER_MODE', 'PINEAPPLE_DEVICE_FILTER_ADD',
            'PINEAPPLE_DEVICE_FILTER_ADD_FILE', 'PINEAPPLE_DEVICE_FILTER_DEL',
            'PINEAPPLE_DEVICE_FILTER_LIST', 'PINEAPPLE_DEVICE_FILTER_CLEAR',
            'PINEAPPLE_NETWORK_FILTER_MODE', 'PINEAPPLE_NETWORK_FILTER_ADD',
            'PINEAPPLE_NETWORK_FILTER_ADD_FILE', 'PINEAPPLE_NETWORK_FILTER_DEL',
            'PINEAPPLE_NETWORK_FILTER_LIST', 'PINEAPPLE_NETWORK_FILTER_CLEAR',
            'PINEAPPLE_EXAMINE_CHANNEL', 'PINEAPPLE_EXAMINE_BSSID', 'PINEAPPLE_EXAMINE_RESET',
            'PINEAPPLE_HOPPING_START', 'PINEAPPLE_HOPPING_STOP',
            'PINEAPPLE_SET_BANDS', 'PINEAPPLE_DEAUTH_CLIENT',
            'PINEAPPLE_RECON_NEW', 'PINEAPPLE_LOOT_ARCHIVE',
            'FIND_CLIENT_IP',
            // GPS & Wigle
            'GPS_CONFIGURE', 'GPS_LIST', 'GPS_GET',
            'WIGLE_LOGIN', 'WIGLE_LOGOUT', 'WIGLE_START', 'WIGLE_STOP', 'WIGLE_UPLOAD',
            // VPN & Tunneling
            'OPENVPN_CONFIGURE', 'OPENVPN_ENABLE', 'OPENVPN_DISABLE',
            'WIREGUARD_CONFIGURE', 'WIREGUARD_ENABLE', 'WIREGUARD_DISABLE',
            'AUTOSSH_CONFIGURE', 'AUTOSSH_ENABLE', 'AUTOSSH_DISABLE',
            'AUTOSSH_CLEAR', 'AUTOSSH_ADD_PORT',
            // DNS Spoofing
            'DNSSPOOF_ADD_HOST', 'DNSSPOOF_DEL_HOST', 'DNSSPOOF_CLEAR',
            'DNSSPOOF_ENABLE', 'DNSSPOOF_DISABLE', 'SYSTEM_DNS',
            // USB
            'USB_STORAGE', 'USB_WAIT', 'USB_EJECT',
            // System
            'SLA_ACCEPT', 'TOS_ACCEPT', 'PASSWORD', 'INSTALL_FIRMWARE',
            'SSH_ADD_KNOWN_HOST',
        ];
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#')) { continue; }
            const word = line.split(/\s/)[0];
            for (const cmd of duckyCmds) {
                if (word && word.toLowerCase() === cmd.toLowerCase() && word !== cmd) {
                    diags.push(new vscode.Diagnostic(new vscode.Range(i, 0, i, word.length),
                        `Should be uppercase: ${cmd}`, vscode.DiagnosticSeverity.Error));
                }
            }
        }
        this.diagnostics.set(uri, diags);
        return diags.filter(d => d.severity === vscode.DiagnosticSeverity.Error).length === 0;
    }

    async fixLineEndingsInEditor(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }
        if (editor.document.eol === vscode.EndOfLine.LF) { vscode.window.showInformationMessage('Already LF'); return; }
        await editor.edit((eb: vscode.TextEditorEdit) => {
            const doc = editor.document;
            eb.replace(new vscode.Range(doc.positionAt(0), doc.positionAt(doc.getText().length)),
                doc.getText().replace(/\r\n/g, '\n'));
        });
        vscode.window.showInformationMessage('Converted to LF');
    }

    async validateCurrentPayload(): Promise<void> {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }
        const ok = this.validatePayload(editor.document.getText(), editor.document.uri);
        vscode.window.showInformationMessage(ok ? '✅ Passed' : '⚠️ Check Problems panel');
    }

    get isRunning(): boolean { return this.running !== null; }
    get runningName(): string { return this.running?.name || ''; }

    dispose() {
        this.outputChannel.dispose();
        this.diagnostics.dispose();
        this._onRunStateChange.dispose();
        this.clearSpinner();
        if (this.running) { this.running.kill(); }
    }
}

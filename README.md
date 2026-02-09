# Pineapple Pager Dev

Develop, deploy, run, and debug WiFi Pineapple Pager payloads directly from VS Code.

> **This extension is under active development.** Some features may contain bugs or behave unexpectedly. Bug reports and feedback are welcome via the [issue tracker](https://github.com/JackVinati/pineapple-pager-dev/issues).

---

## What It Does

Pineapple Pager Dev replaces the manual cycle of editing, SCP-uploading, SSH-ing, chmod-ing, and running payloads on the Hak5 WiFi Pineapple Pager. One keystroke deploys and runs your payload with live output streaming back into VS Code.

The extension provides full DuckyScript syntax highlighting, IntelliSense snippets, interactive dialog support, device management, loot browsing, and payload templates — all through the SSH connection to your Pager.

---

## Features

### Deploy and Run

- **Ctrl+Shift+R** — Smart Deploy and Run (only uploads if the file changed, then runs)
- **Ctrl+Shift+D** — Deploy without running
- **Ctrl+Shift+S** — Stop a running payload instantly
- **Ctrl+Shift+L** — Toggle device log streaming
- Auto-detects payload category from the `# Category:` header comment
- Auto-fixes Windows line endings (CRLF to LF) before upload
- Auto-sets executable permissions on the Pager
- Creates the correct remote directory structure automatically

### Smart Deploy

The default deploy command hashes your payload locally and compares it against the deployed version. If nothing changed, it skips the upload and runs the existing copy. This makes the edit-test loop faster, especially over slower USB connections.

### Multi-File Payload Deploy

Payloads that include helper scripts, config files, or data files alongside `payload.sh` can be deployed as a complete folder. The extension uploads the entire directory tree recursively.

### Interactive DuckyScript Dialogs

When a payload calls DuckyScript UI commands (CONFIRMATION_DIALOG, TEXT_PICKER, NUMBER_PICKER, IP_PICKER, MAC_PICKER, PROMPT, etc.), the extension intercepts them and shows native VS Code dialogs. This means you can develop and test interactive payloads without pushing to the Pager screen every time.

### Live Output Streaming

Payload output streams in real time to the VS Code Output panel. LOG messages, errors, and exit codes all appear as the payload runs. A separate device log stream (Ctrl+Shift+L) tails `logread` for system-level debugging.

### DuckyScript Syntax Highlighting

Full syntax highlighting for all Pager DuckyScript commands (LOG, ALERT, CONFIRMATION_DIALOG, PINEAPPLE_DEAUTH_CLIENT, WIFI_OPEN_AP, etc.) on top of standard bash syntax. The grammar covers user commands, Pineapple commands, WiFi/VPN/DNS commands, and Pager-specific paths.

### IntelliSense Snippets

Type a prefix and press Tab to expand common patterns:

| Prefix | Expands To |
|--------|------------|
| `payload-header` | Full boilerplate with metadata and signal trap |
| `log` | LOG with color placeholder |
| `confirm` | CONFIRMATION_DIALOG with exit check |
| `spinner` | START_SPINNER / STOP_SPINNER pair |
| `btscan` | Bluetooth scan template |
| `mainloop` | Interruptible while loop with RUNNING flag |
| `lootsave` | Save output to timestamped loot file |

### Sidebar: Device Info

A tree view showing live device information — model, firmware version, kernel, IP, battery level, uptime, memory, overlay and MMC storage, load average, process count, radio count, and Bluetooth address.

Includes a collapsible WiFi status section showing the state of all six interfaces: client (wlan0cli), client IP, Open AP, WPA AP, Management AP, and Monitor mode.

### Sidebar: Payloads on Device

Browse all payloads installed on the Pager organized by category. Right-click to run, view source, download to local, rename, or delete. Supports both individual files and payload directories.

### Sidebar: Loot Explorer

Browse, preview, and download files from `/root/loot/`. Text files open directly in VS Code. Binary files (pcap, cap, pcapng, hashcat .22000) display a hex dump preview with packet summary when tcpdump is available.

### Battery Status Bar

A status bar item shows the Pager's battery percentage with a charging indicator. Polls every 60 seconds while connected. Icons adapt to battery level (empty, low, medium, high, full, charging).

### Auto-Reconnect

If the SSH connection drops unexpectedly, the extension waits 3 seconds then reconnects automatically. A notification gives you the option to reconnect immediately or cancel. This can be toggled off in settings.

### Connection Error Handling

All SSH error types (timeout, refused, unreachable, auth failure) show specific diagnostic messages with a Retry button. Timeout errors include guidance about Pager boot time and how to increase the timeout setting.

### Payload Templates

Ctrl+Shift+P, then "Pager: New Payload from Template" offers 12 templates:

| Template | Description |
|----------|-------------|
| Basic Payload | Simple boilerplate with signal handling |
| Reconnaissance | Loop-based scanning with loot directory |
| WiFi Audit | Channel enumeration across all radios |
| Bluetooth Scanner | BLE/classic scan loop |
| Data Exfiltration | JSON data collection to timestamped files |
| Interactive | Text/number pickers, spinners, confirmation |
| Alert: Handshake Captured | Triggered on WPA handshake capture |
| Alert: Client Connected | Triggered when client joins a Pineapple AP |
| Alert: Client Disconnected | Triggered when client leaves a Pineapple AP |
| Alert: Deauth Flood | Triggered on deauth flood detection |
| Recon: AP Scanner | Run against a discovered access point |
| Recon: Client Scanner | Run against a discovered client |

Alert templates include all available environment variables as documented comments. Recon templates include both AP and client environment variables.

### Payload Config Editor

Ctrl+Shift+P, then "Pager: Edit Payload Config" lets you view, set, and delete UCI-based payload configuration values directly from VS Code. This is the same persistent config that `PAYLOAD_GET_CONFIG` and `PAYLOAD_SET_CONFIG` read and write from payloads.

### Payload Validation

The extension checks your payload for common issues: missing shebang, CRLF line endings, DuckyScript command casing errors, and unmatched quotes.

### Theme Support

The sidebar icon uses `currentColor` and adapts automatically to both dark and light VS Code themes.

---

## Quick Start

### 1. Install

Install the `.vsix` file from the command line:

```
code --install-extension pineapple-pager-dev-1.2.0.vsix
```

Or install from the VS Code Extensions view: click the `...` menu, select "Install from VSIX", and choose the file.

### 2. Connect

Click the "Pager: Offline" status bar item at the bottom left of VS Code. Enter your SSH password when prompted.

Alternatively: Ctrl+Shift+P, then "Pager: Connect to Device".

### 3. Write and Deploy

Create a new payload from a template (Ctrl+Shift+P, "Pager: New Payload from Template"), edit it, then press Ctrl+Shift+R to deploy and run.

---

## Configuration

Open Settings (Ctrl+,) and search for "Pager":

| Setting | Default | Description |
|---------|---------|-------------|
| `pagerDev.host` | `172.16.52.1` | Pager IP address |
| `pagerDev.port` | `22` | SSH port |
| `pagerDev.username` | `root` | SSH username |
| `pagerDev.password` | *(empty)* | SSH password (prompts if blank) |
| `pagerDev.privateKeyPath` | *(empty)* | Path to SSH private key |
| `pagerDev.autoDeployOnSave` | `false` | Auto-deploy payload.sh on save |
| `pagerDev.autoFixLineEndings` | `true` | Convert CRLF to LF before deploy |
| `pagerDev.autoReconnect` | `true` | Auto-reconnect on unexpected disconnect |
| `pagerDev.defaultCategory` | `general` | Default payload category |
| `pagerDev.payloadBasePath` | `/root/payloads/user` | Payload root on Pager |
| `pagerDev.lootPath` | `/root/loot` | Loot directory on Pager |
| `pagerDev.showOutputOnRun` | `true` | Auto-show output panel on run |
| `pagerDev.connectionTimeout` | `30` | SSH handshake timeout in seconds |
| `pagerDev.deployTimeout` | `10` | Deploy timeout in seconds |
| `pagerDev.runTimeout` | `300` | Max payload runtime in seconds (0 = unlimited) |

### SSH Key Authentication

```bash
ssh-keygen -t ed25519 -f ~/.ssh/pager_key
ssh-copy-id -i ~/.ssh/pager_key root@172.16.52.1
```

Then set `pagerDev.privateKeyPath` to the path of your private key.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl+Shift+R | Smart Deploy and Run |
| Ctrl+Shift+D | Deploy (no run) |
| Ctrl+Shift+S | Stop running payload |
| Ctrl+Shift+L | Toggle device log stream |

---

## Commands

All commands are available via Ctrl+Shift+P:

| Command | Description |
|---------|-------------|
| Pager: Connect to Device | Open SSH connection |
| Pager: Disconnect | Close SSH connection |
| Pager: Smart Deploy and Run | Upload if changed, then run |
| Pager: Deploy and Run (always) | Always upload, then run |
| Pager: Deploy Payload | Upload without running |
| Pager: Deploy Payload Folder | Upload entire payload directory |
| Pager: Run on Device (no deploy) | Run already-deployed version |
| Pager: Stop Payload | Kill running payload |
| Pager: New Payload from Template | Create payload from 12 templates |
| Pager: Validate Payload | Check for common issues |
| Pager: Fix Line Endings (LF) | Convert current file to LF |
| Pager: Open SSH Terminal | Open native SSH session |
| Pager: Stream Device Logs | Toggle system log tail |
| Pager: Edit Payload Config | View/set/delete UCI config values |

---

## Requirements

- VS Code 1.85 or later
- WiFi Pineapple Pager connected via USB-C (default IP: 172.16.52.1)
- SSH access configured on the Pager (root password set during first-time setup)

---

## Known Issues

This extension is in early development. Known issues include:

- SFTP connections can occasionally stall on Dropbear (the Pager's SSH server). The extension falls back to exec-based file operations where possible.
- The DuckyScript shim for interactive dialogs uses a polling-based approach over SSH. Under heavy load or slow connections, dialog responses may take a moment to register.
- Some complex payloads that write rapidly to stdout may experience output buffering delays in the VS Code Output panel.
- Need to fix some loot export issues

Report bugs at: https://github.com/JackVinati/pineapple-pager-dev-extension/issues

---

## Building from Source

```bash
git clone https://github.com/JackVinati/pineapple-pager-dev-extension.git
cd pineapple-pager-dev-extension
npm install
npm run compile
npx vsce package
```

---

## License

MIT

---

## Disclaimer

This tool is intended for authorized security testing and educational purposes only. Always obtain proper authorization before testing on networks you do not own. The authors are not responsible for misuse.

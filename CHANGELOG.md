# Changelog

## 1.2.0 — 2026-02-09

### New Features
- **Auto-reconnect**: Automatically reconnects after unexpected SSH drops (configurable, on by default)
- **Retry button**: All SSH error messages now include a "Retry" button
- **Battery status bar**: Live battery percentage and charging indicator in the VS Code status bar, polled every 60s
- **Device log streaming**: `Pager: Stream Device Logs` command (Ctrl+Shift+L) tails `logread -f` in a dedicated output panel
- **Payload config editor**: `Pager: Edit Payload Config` command to view/set/delete UCI-backed payload config directly from VS Code
- **Multi-file deploy**: `Pager: Deploy Payload Folder` uploads all files in the payload directory, not just payload.sh
- **Alert payload templates**: New Payload template picker includes all 4 alert event types (handshake, client connect/disconnect, deauth flood) with correct environment variable documentation
- **Recon payload templates**: AP Scanner and Client Scanner recon templates with all recon environment variables
- **PCAP/handshake hex preview**: Binary loot files (.pcap, .cap, .22000, .hccapx) now show a hex dump + tcpdump packet summary instead of raw binary
- **WiFi status panel**: Device Info sidebar now includes a collapsible WiFi section showing all 5 radio interfaces (client, open AP, WPA AP, mgmt AP, monitor)
- **Firmware version**: Device Info sidebar now shows the Pager firmware version
- **Dark/light theme icons**: Sidebar activity bar icon adapts to VS Code's color theme

### Improvements
- SSH `connectionTimeout` separated from `deployTimeout` (default 30s) — fixes "handshake timeout" on slow Dropbear connections
- Dropbear-compatible SSH algorithm list avoids stalled negotiation
- Contextual SSH error messages with troubleshooting hints for timeout, refused, and unreachable errors
- Battery and charging state shown in Device Info tree
- Hashcat format files (.22000, .hcappx) recognized with key icon in loot explorer
- Version bumped to 1.2.0

## 1.1.0 — 2026-02-09

### Improvements
- DuckyScript shim: Fixed fd 3 redirect so interactive dialogs work correctly when captured with `$()` subshell
- DuckyScript shim: Fixed request ID counter that was stuck at 1 due to subshell variable scoping
- DuckyScript shim: Added PAYLOAD_HOME environment variable
- DuckyScript shim: Added orange LOG color, RINGTONE --vibrate flag, PAYLOAD_*_CONFIG with UCI/fallback chain
- DuckyScript shim: Expanded validator to 80+ DuckyScript commands
- SSH: Separated connectionTimeout (30s) from deployTimeout (10s)
- SSH: Dropbear-compatible algorithm negotiation
- SSH: Contextual error messages for timeout/refused/unreachable

## 1.0.0 — 2026-02-08

### Features
- SSH connection manager with status bar indicator
- One-click deploy with auto CRLF→LF fix and chmod +x
- One-click deploy & run (Ctrl+Shift+R)
- Live output streaming in Output panel
- Stop running payload (Ctrl+Shift+S / Ctrl+C over PTY)
- DuckyScript + Bash syntax highlighting
- 20+ code snippets for Pager payload development
- Sidebar: Device Info (model, memory, radios, BT, uptime)
- Sidebar: Payload browser (view installed payloads on device)
- Sidebar: Loot browser (preview and download loot files)
- 6 payload templates (Basic, Recon, WiFi, BT, Exfil, Interactive)
- Payload validation (shebang, line endings, DuckyScript case check)
- Auto-deploy on save (optional)
- SSH terminal shortcut
- SSH key authentication support
- Configurable timeouts, paths, and categories

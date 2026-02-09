# CLAUDE.md — WiFi Pineapple Pager Dev Extension

## Hardware
- MIPS SoC, OpenWRT, BusyBox ash (not bash), Dropbear SSH
- USB connection: 172.16.52.1:22, root login
- Dropbear limits: max ~10 concurrent SSH channels; reuse connections
- No `stat`, no fractional `sleep` (use `usleep 300000` for 0.3s)
- No heredocs over SSH (Dropbear mangles them); use base64 upload instead
- `sed -i` works but is BusyBox sed (limited regex)
- WiFi radios: wlan0cli (client 2.4GHz), wlan0open, wlan0wpa, wlan0mgmt, wlan1mon (monitor tri-band)
- Battery: ~4 hours per charge; extend with USB battery bank
- Storage: root overlay <32MB after firmware; MMC partition 4GB (stores `/root`, payloads, loot, themes)
- USB-C presents as Realtek RTL8153 USB Ethernet; supported on Linux/Windows/macOS without drivers

## Connectivity
- **USB-C**: `172.16.52.0/24` range, DHCP auto-assigned. SSH + Virtual Pager access.
- **Virtual Pager**: Web interface at `http://172.16.52.1:1471` (USB-C and Mgmt AP networks). Live display, button controls, terminal, loot/handshake download.
- **Wi-Fi Client Mode**: 2.4GHz only via wlan0cli. Supports Open, WPA-PSK, WPA2-PSK, WPA3-SAE. No 5GHz. No enterprise auth.
- **Wi-Fi Management AP**: Optional WPA2-PSK or WPA3-SAE management network for SSH/Virtual Pager access.
- **USB Ethernet**: Supports most USB Ethernet chipsets via USB-A port.

## Payload Structure

### Three Payload Types
1. **User payloads** — full-featured, launched manually from Payload dashboard. Full DuckyScript command access.
   - Path: `/root/payloads/{category}/{name}/payload.sh`
   - Categories: general, reconnaissance, exfiltration, interception, remote_access, games, prank
2. **Alert payloads** — small non-interactive scripts triggered by background events. Run automatically when events fire.
   - Path: `/root/payloads/alerts/{event_type}/{name}/payload.sh`
   - Events: `handshake_captured`, `pineapple_client_connected`, `pineapple_client_disconnected`, `deauth_flood_detected`
   - **Cannot** launch dialogs or input pickers (would interrupt user on any screen)
   - **Can** use the `ALERT` command for full-screen messages
   - All enabled alerts for an event type run simultaneously
3. **Recon payloads** — run against discovered APs/clients from the recon device list. Full DuckyScript command access. Receive recon environment variables.

### Payload Metadata
```bash
#!/bin/bash
# Title: An awesome payload title
# Description: A longer description about the payload functionality
# Author: Your Name <yourname@youremail.com>
```

### General Rules
- Shebang: `#!/bin/bash` (mapped to ash)
- Loot dir: `/root/loot/{payload_name}/`
- Handshakes dir: `/root/loot/handshakes/` (both PCAP and Hashcat .22000 hcappx format)
- Ringtone files: `/root/ringtones/` (RTTTL format)
- `$PAYLOAD_HOME` — directory where the payload is installed (available in all payload types)
- Always end payloads with `exit 0`
- Official payload repo: `https://github.com/hak5/wifipineapplepager-payloads/tree/master`

### Installing Payloads
```bash
scp -r library/alerts/pineapple_client_connected/example root@172.16.52.1:/root/payloads/alerts/pineapple_client_connected/
```
- Use `scp` or `sftp` (not plain FTP)
- Windows users must ensure Unix (LF) line endings
- Default root dir: `/root` (equivalent to `/mmc/root`)

## DuckyScript Commands — Complete Reference
Commands are ALL CAPS shell functions provided by firmware. Firmware 1.0.7 is latest.

### UI Dialogs & Pickers
| Command | Args | Stdout | Exit Code | Blocking | Notes |
|---------|------|--------|-----------|----------|-------|
| `LOG {color} "msg"` | color: red/green/blue/cyan/yellow/magenta/purple/white | — | 0 | No | Color is optional; uses theme-defined colors |
| `ALERT "msg"` | message text | — | 0 | **No** | Since 1.0.5, always plays configured alert ringtone. Usable from alert payloads |
| `PROMPT "msg"` | message text | — | 0 | **Yes** | Modal dialog, pauses until user confirms |
| `ERROR_DIALOG "msg"` | message text | — | 0 | **Yes** | Should usually be last thing called before exit |
| `CONFIRMATION_DIALOG "msg"` | message text | `1` (yes) / `0` (no) | 0=ok, non-zero=cancel | **Yes** | |
| `TEXT_PICKER "title" "default"` | title, default value (use `""` for empty) | user text | 0=ok, non-zero=cancel | **Yes** | |
| `IP_PICKER "title" "default_ip"` | title, default IPv4 (use `""` for empty) | IPv4 string | 0=ok, non-zero=cancel | **Yes** | IPv4-optimized keyboard |
| `MAC_PICKER "title" "default_mac"` | title, default MAC (use `""` for empty) | MAC string | 0=ok, non-zero=cancel | **Yes** | |
| `NUMBER_PICKER "title" "default"` | title, default number (use `""` for empty) | number string | 0=ok, non-zero=cancel | **Yes** | Numerical keyboard |
| `WAIT_FOR_BUTTON_PRESS {button}` | ANY/UP/DOWN/LEFT/RIGHT/A/B | button name | 0 | **Yes** | |
| `WAIT_FOR_INPUT` | none | button name | 0 | **Yes** | Any button press |
| `START_SPINNER "msg"` | message text | spinner ID | 0 | No | Pre-1.0.5: multi-word messages create uncancellable spinner |
| `STOP_SPINNER id` | spinner ID from START_SPINNER | — | 0 | No | |
| `RINGTONE {--vibrate} "name_or_rtttl"` | ringtone name or RTTTL string | — | 0 | No | Errors if another ringtone is already playing. Files from `/root/ringtones/` |
| `VIBRATE "pattern"` | RTTTL pattern/name | — | 0 | No | Vibration-only (no audio). Errors if another ringtone/vibration is playing |

### DuckyScript Constants
```
$DUCKYSCRIPT_USER_CONFIRMED = 1
$DUCKYSCRIPT_USER_DENIED = 0
$DUCKYSCRIPT_CANCELLED = 1   (exit code)
$DUCKYSCRIPT_REJECTED = 2    (exit code)
$DUCKYSCRIPT_ERROR = 3       (exit code)
```

### Standard Patterns
```bash
# Short-form cancellation pattern
result=$(TEXT_PICKER "Enter value" "default") || exit 0

# Explicit cancellation pattern
result=$(TEXT_PICKER "Enter value" "default")
case $? in
    $DUCKYSCRIPT_CANCELLED|$DUCKYSCRIPT_REJECTED|$DUCKYSCRIPT_ERROR)
        LOG "Cancelled"; exit 0 ;;
esac

# Confirmation dialog
resp=$(CONFIRMATION_DIALOG "Continue?") || exit 1
if [ "$resp" != "$DUCKYSCRIPT_USER_CONFIRMED" ]; then
    LOG "User cancelled!"; exit 0
fi

# Spinner lifecycle
__spinnerid=$(START_SPINNER "Thinking")
sleep 5
STOP_SPINNER ${__spinnerid}

# Config with picker default
__config_host=$(PAYLOAD_GET_CONFIG demopayload host)
__host=$(TEXT_PICKER "Hostname" "${__config_host}") || exit 0
PAYLOAD_SET_CONFIG demopayload host "${__host}"

# Error dialog pattern
CONFIRMATION_DIALOG "Continue?" || { ERROR_DIALOG "Aborted"; exit 0; }

# Device filter setup (disable mimic, configure, re-enable)
PINEAPPLE_MIMIC_DISABLE
PINEAPPLE_DEVICE_FILTER_CLEAR allow
PINEAPPLE_DEVICE_FILTER_ADD allow 00:DE:AD:BE:EF:05 01:FE:ED:FA:CE:99
PINEAPPLE_DEVICE_FILTER_MODE allow
PINEAPPLE_MIMIC_ENABLE

# Network filter setup
PINEAPPLE_MIMIC_DISABLE
PINEAPPLE_NETWORK_FILTER_CLEAR allow
PINEAPPLE_NETWORK_FILTER_ADD allow "Free Wi-Fi" "HP Setup"
PINEAPPLE_NETWORK_FILTER_MODE allow
PINEAPPLE_MIMIC_ENABLE
```

### Payload Config (UCI-backed, persistent across firmware upgrades)
| Command | Args | Stdout | Notes |
|---------|------|--------|-------|
| `PAYLOAD_GET_CONFIG payload option` | payload name (no spaces, unique), option key | config value | Exit 0 on success |
| `PAYLOAD_SET_CONFIG payload option value` | payload name, key, value | — | Failure usually means illegal name |
| `PAYLOAD_DEL_CONFIG payload option` | payload name, key | — | Missing config is silently ignored |

### LED & Display
| Command | Args | Notes |
|---------|------|-------|
| `LED color pattern` | color: blue/red/green/magenta/cyan/amber/white/off; pattern: solid/blink/off | Also: `LED SETUP/ATTACK/FINISH/FAIL/OFF/CLEANUP` |
| `DPADLED color` | red/green/blue/cyan/yellow/magenta/white/off | D-pad LED |
| `DPADLED_CONFIG color` | same | Set default D-pad LED |
| `ENABLE_DISPLAY` | — | Turn on screen |
| `DISABLE_DISPLAY` | — | Turn off screen |

### Battery (firmware 1.0.7+)
| Command | Stdout |
|---------|--------|
| `BATTERY_PERCENT` | percentage integer |
| `BATTERY_CHARGING` | charging status |

### WiFi Operations
```
WIFI_CONNECT interface ssid encryption {key} {bssid}
  encryption: open, psk, psk2, sae
  interface: wlan0cli (client 2.4GHz only, no 5GHz, no enterprise auth)
  example: WIFI_CONNECT wlan0cli 'MyNetwork' psk2 'Password' ANY
  run WIFI_CONNECT --help for more options
WIFI_DISCONNECT interface
WIFI_CLEAR interface                              — clear client Wi-Fi config
WIFI_WAIT interface count_seconds                 — wait for client Wi-Fi to connect
WIFI_OPEN_AP interface ssid {bssid}               — configure open AP
WIFI_OPEN_AP_HIDE interface                       — set open AP to hidden
WIFI_OPEN_AP_CLEAR interface
WIFI_OPEN_AP_DISABLE interface
WIFI_WPA_AP interface ssid encryption key {bssid} — configure WPA AP (EvilWPA)
WIFI_WPA_AP_HIDE interface                        — set WPA AP to hidden
WIFI_WPA_AP_CLEAR interface
WIFI_WPA_AP_DISABLE interface
WIFI_MGMT_AP interface ssid encryption key {bssid}
  example: WIFI_MGMT_AP wlan0mgmt 'PagerMgmt' sae-mixed 'Password'
  run WIFI_MGMT_AP --help for more options
WIFI_MGMT_AP_HIDE interface
WIFI_MGMT_AP_CLEAR interface
WIFI_MGMT_AP_DISABLE interface
WIFI_PCAP_START                                   → stdout: pcap filename (in-kernel filtered)
WIFI_PCAP_STOP
```
For unfiltered capture, use `tcpdump` directly on the interface.

### PineAP / Recon
```
# SSID Pool (max 64 SSIDs; oldest auto-expired when full)
PINEAPPLE_SSID_POOL_ADD ssid {ssid2...ssidN}     — accepts multiple SSIDs
PINEAPPLE_SSID_POOL_ADD_FILE /path                (1.0.6+) one SSID per line
PINEAPPLE_SSID_POOL_LIST
PINEAPPLE_SSID_POOL_DELETE ssid {ssid2...ssidN}
PINEAPPLE_SSID_POOL_CLEAR
PINEAPPLE_SSID_POOL_START {random}                — requires Open AP enabled + Mimic on
  random=true: randomize BSSID per SSID (avoids IDS, reduces client success)
  random=false: use Open AP's real BSSID
PINEAPPLE_SSID_POOL_STOP
PINEAPPLE_SSID_POOL_COLLECT_START                 — auto-collect SSIDs from probe requests
PINEAPPLE_SSID_POOL_COLLECT_STOP

# Mimic (1.0.5+, renamed in 1.0.6)
PINEAPPLE_MIMIC_ENABLE                            — accept connections for mimic SSIDs on Open AP
PINEAPPLE_MIMIC_DISABLE

# Device (MAC) Filters — previously PINEAPPLE_MAC_FILTER_* (old names still work)
# Allow mode: only listed MACs connect. Deny mode: all except listed MACs.
PINEAPPLE_DEVICE_FILTER_MODE allow|deny
PINEAPPLE_DEVICE_FILTER_ADD allow|deny mac {mac2...macN}
PINEAPPLE_DEVICE_FILTER_ADD_FILE allow|deny /path (1.0.6+) one MAC per line
PINEAPPLE_DEVICE_FILTER_DEL allow|deny mac {mac2...macN}
PINEAPPLE_DEVICE_FILTER_LIST allow|deny
PINEAPPLE_DEVICE_FILTER_CLEAR allow|deny

# Network (SSID) Filters — previously PINEAPPLE_SSID_FILTER_* (old names still work)
# Allow mode: only listed SSIDs impersonated. Deny mode: all except listed.
PINEAPPLE_NETWORK_FILTER_MODE allow|deny
PINEAPPLE_NETWORK_FILTER_ADD allow|deny ssid {ssid2...ssidN}
PINEAPPLE_NETWORK_FILTER_ADD_FILE allow|deny /path (1.0.6+) one SSID per line
PINEAPPLE_NETWORK_FILTER_DEL allow|deny ssid {ssid2...ssidN}
PINEAPPLE_NETWORK_FILTER_LIST allow|deny
PINEAPPLE_NETWORK_FILTER_CLEAR allow|deny

# Examine (lock to channel/AP; stops hopping)
PINEAPPLE_EXAMINE_CHANNEL channel {time}          — time in seconds; without time, stays until RESET
PINEAPPLE_EXAMINE_BSSID bssid {time}              — find and lock to known AP's channel
PINEAPPLE_EXAMINE_RESET                           — resume normal channel hopping

# Hopping control (1.0.7+)
PINEAPPLE_HOPPING_START                           — resume recon channel hopping
PINEAPPLE_HOPPING_STOP                            — stop recon channel hopping

# Band selection
PINEAPPLE_SET_BANDS interface {2} {5} {6}         — interface usually wlan1mon
  example: PINEAPPLE_SET_BANDS wlan1mon 2         — 2.4GHz only
  example: PINEAPPLE_SET_BANDS wlan1mon 2 5 6     — all bands

# Deauthentication
PINEAPPLE_DEAUTH_CLIENT bssid target channel
  bssid: AP MAC (xx:xx:xx:xx:xx:xx)
  target: client MAC or FF:FF:FF:FF:FF:FF (all clients)
  channel: WiFi channel
  Non-blocking (runs in background via PineAP)
  LIMITATIONS:
  - Works on 2.4GHz and non-DFS 5GHz only
  - DFS channels prohibit transmission (regulatory)
  - 6GHz requires WPA3 with Protected Management Frames (PMF) — deauth not possible
  - WPA3/802.11w PMF networks are not susceptible
  - Some clients deliberately ignore deauth attempts

# Session management
PINEAPPLE_RECON_NEW {name}                        — start new recon session; also starts new pcap + wigle logs
PINEAPPLE_LOOT_ARCHIVE                            (1.0.7+) archive current loot with timestamp

# Client IP lookup
FIND_CLIENT_IP mac {timeout}                      — searches ARP + DHCP records
  mac: xx:xx:xx:xx:xx:xx format
  timeout: seconds to keep searching (optional)
  stdout: IP address; exit 0 on success, non-zero on failure
```

### VPN & Tunneling
```
OPENVPN_CONFIGURE enable|disable {config_file}
OPENVPN_ENABLE
OPENVPN_DISABLE
WIREGUARD_CONFIGURE enable|disable {config_file_or_params}
WIREGUARD_ENABLE
WIREGUARD_DISABLE
AUTOSSH_CONFIGURE enable|disable {host} {port} {user} {remoteport} {localport}
AUTOSSH_ENABLE
AUTOSSH_DISABLE
AUTOSSH_CLEAR
AUTOSSH_ADD_PORT                                  — add a port forward to AutoSSH
```

### DNS Spoofing
```
DNSSPOOF_ADD_HOST A|AAAA hostname ip
DNSSPOOF_DEL_HOST hostname
DNSSPOOF_CLEAR
DNSSPOOF_ENABLE
DNSSPOOF_DISABLE
SYSTEM_DNS DHCP|ip_address                        — override system DNS
```

### GPS & Wigle
```
GPS_CONFIGURE serial_device {baud_rate}
  serial_device: e.g. ttyUSB0 or ttyACM0 (check /dev/serial/by-path/)
  common baud rates: 4800, 9600, 115200
  supported chipsets: U-Blox M8030-KT, Quectel, most USB serial GPS
GPS_LIST                                          — list available GPS serial devices
GPS_GET                                           → stdout: lat,lon,alt,speed

WIGLE_LOGIN {username} {password}
  without args: interactive prompts (not suitable for payloads)
  requires Internet; returns error on bad credentials
  API key saved to payload config
WIGLE_LOGOUT                                      — delete saved API keys
WIGLE_START                                       → stdout: log filename
  creates Wigle-compatible CSV in /root/loot/wigle/
  can create log without GPS, but stays empty until position acquired
WIGLE_STOP
WIGLE_UPLOAD {--archive} {--remove} {/path}
  --archive: move file to /root/loot/archive/wigle/ after upload
  --remove: delete file after upload
  accepts full paths e.g. /root/loot/wigle/*
  requires Internet connection
```

### USB
```
USB_STORAGE
USB_WAIT
USB_EJECT
```

### System
```
SLA_ACCEPT --i-accept
TOS_ACCEPT --i-accept
PASSWORD new_password
INSTALL_FIRMWARE file
  WARNING: Do NOT run via Virtual Pager shell — upgrade stops all services
  including the virtual pager, potentially terminating your shell mid-upgrade.
  Use SSH directly instead.
SSH_ADD_KNOWN_HOST hostname keytype keydata
```

### Developer
```
DEVELOPER_THEME_RELOAD {component}
```

## Alert Payload Environment Variables

All alert payloads receive `$PAYLOAD_HOME` (payload install directory) and `$_ALERT` (alert name).

### deauth_flood_detected
| Variable | Description |
|----------|-------------|
| `_ALERT_DENIAL_MESSAGE` | Human-readable description of the event |
| `_ALERT_DENIAL_SOURCE_MAC_ADDRESS` | Source of the denial flood |
| `_ALERT_DENIAL_DESTINATION_MAC_ADDRESS` | Destination of the denial flood |
| `_ALERT_DENIAL_AP_MAC_ADDRESS` | Access point targeted by denial flood |
| `_ALERT_DENIAL_CLIENT_MAC_ADDRESS` | Client targeted by denial flood |

### handshake_captured
| Variable | Description |
|----------|-------------|
| `_ALERT_HANDSHAKE_SUMMARY` | Human-readable description of handshake |
| `_ALERT_HANDSHAKE_AP_MAC_ADDRESS` | MAC address of the access point |
| `_ALERT_HANDSHAKE_CLIENT_MAC_ADDRESS` | MAC address of the client |
| `_ALERT_HANDSHAKE_TYPE` | Handshake type: `EAPOL` or `PMKID` |
| `_ALERT_HANDSHAKE_COMPLETE` | Is it a complete 4-way + beacon? (EAPOL only) |
| `_ALERT_HANDSHAKE_CRACKABLE` | Contains packets needed for attack? (EAPOL only) |
| `_ALERT_HANDSHAKE_PCAP_PATH` | Path to the handshake pcap file |
| `_ALERT_HANDSHAKE_HASHCAT_PATH` | Path to the hashcat 22000-format file |

### pineapple_client_connected
| Variable | Description |
|----------|-------------|
| `_ALERT_CLIENT_CONNECTED_SUMMARY` | Human-readable summary |
| `_ALERT_CLIENT_CONNECTED_CLIENT_MAC_ADDRESS` | Client MAC address |
| `_ALERT_CLIENT_CONNECTED_SSID` | SSID client connected to |
| `_ALERT_CLIENT_CONNECTED_SSID_LENGTH` | Length of SSID |

### pineapple_client_disconnected
Triggered when a client disconnects from a Pineapple access point.

## Recon Payload Environment Variables

All recon payloads receive `$PAYLOAD_HOME`. Client payloads receive both AP and client variables.

### Access Point Variables
| Variable | Description |
|----------|-------------|
| `_RECON_SELECTED_AP_OUI` | OUI / Manufacturer name |
| `_RECON_SELECTED_AP_SSID` | Primary SSID (UTF-8) |
| `_RECON_SELECTED_AP_HIDDEN` | Is SSID hidden/decloaked |
| `_RECON_SELECTED_AP_CHANNEL` | Advertised channel |
| `_RECON_SELECTED_AP_ENCRYPTION_TYPE` | Advertised encryption |
| `_RECON_SELECTED_AP_CLIENT_COUNT` | Number of detected clients |
| `_RECON_SELECTED_AP_BEACONED_SSIDS` | Number of beaconed SSIDs |
| `_RECON_SELECTED_AP_PROBED_SSIDS` | Number of probed SSIDs (if AP acted as client) |
| `_RECON_SELECTED_AP_RESPONDED_SSIDS` | Number of responded SSIDs |
| `_RECON_SELECTED_AP_BEACONED_SSID` | Primary beaconed SSID |
| `_RECON_SELECTED_AP_PROBED_SSID` | Primary probed SSID |
| `_RECON_SELECTED_AP_RESPONDED_SSID` | Primary probe response SSID |
| `_RECON_SELECTED_AP_MAC_ADDRESS` | MAC address of AP |
| `_RECON_SELECTED_AP_BSSID` | MAC address of AP (alias) |
| `_RECON_SELECTED_AP_TIMESTAMP` | Time AP was first seen |
| `_RECON_SELECTED_AP_RSSI` | Signal strength |
| `_RECON_SELECTED_AP_FREQ` | Frequency |
| `_RECON_SELECTED_AP_PACKETS` | Packet count (human-readable: 100K, 100M, etc.) |

### Client Variables (in addition to all AP variables above)
| Variable | Description |
|----------|-------------|
| `_RECON_SELECTED_CLIENT_OUI` | OUI / Manufacturer name |
| `_RECON_SELECTED_CLIENT_BEACONED_SSIDS` | Number of beaconed SSIDs (if acted as AP) |
| `_RECON_SELECTED_CLIENT_PROBED_SSIDS` | Number of probed SSIDs |
| `_RECON_SELECTED_CLIENT_RESPONDED_SSIDS` | Number of responded SSIDs (if acted as AP) |
| `_RECON_SELECTED_CLIENT_BEACONED_SSID` | Primary beaconed SSID (if acted as AP) |
| `_RECON_SELECTED_CLIENT_PROBED_SSID` | Primary probed SSID |
| `_RECON_SELECTED_CLIENT_RESPONDED_SSID` | Primary probe response SSID (if acted as AP) |
| `_RECON_SELECTED_CLIENT_MAC_ADDRESS` | MAC address of client |
| `_RECON_SELECTED_CLIENT_TIMESTAMP` | Time client was first seen |
| `_RECON_SELECTED_CLIENT_RSSI` | Signal strength |
| `_RECON_SELECTED_CLIENT_FREQ` | Frequency |
| `_RECON_SELECTED_CLIENT_PACKETS` | Packet count (human-readable) |

## PineAP Concepts

### Open AP (Karma/Mimicry)
- Responds to client probe requests with matching SSID (karma attack)
- Four controls: (1) Enable Open AP, (2) Enable Mimic mode, (3) Client filter, (4) Network filter
- Default: both filters in allow mode with empty lists (blocks all associations out of the box)

### EvilWPA
- Clone existing AP with matching passphrase and encryption type
- Supports PMKID capture mode for partial WPA handshakes (offline attacks)
- Partial PMKID data saved to `/root/loot/handshakes/`

### Handshake Collection
- Targets WPA-PSK and WPA2-PSK (WPA3/SAE not vulnerable to offline attack)
- 4-way handshake generated on client connect or key refresh (~300s/5min default)
- Saved in both PCAP and Hashcat .22000 hcappx format in `/root/loot/handshakes/`

### Filter Combinations (typical)
- Network Filter: Allow mode with target SSIDs in allow list
- Client Filter: Deny mode with empty list (captures any client trying to connect to target SSIDs)

### Recon Behavior
- Fully passive; channel hopping across enabled bands
- Auto-pauses on channel when handshake packet detected
- Hidden networks auto-decloaked when clients join
- Modern OS MAC randomization: randomized clients appear as new devices
- 6GHz requires WPA3 (even "open" uses WPA3-OWE); all 6GHz has PMF preventing deauth

## Package Management (opkg)
```bash
opkg update                       # requires Internet
opkg list | grep python3          # search packages
opkg install -d mmc <package>     # install to MMC (recommended for large packages)
```
- **NEVER** use `opkg` to update pre-installed system packages (will break device)
- Root overlay packages do NOT persist over firmware upgrades; MMC packages DO persist
- Prefer pre-packaged opkg solutions over pip (native compilation not reliably supported)

## Firewall
Default firewall limits SSH and Virtual Pager to USB-C and Management AP networks.
To disable, edit `/etc/config/firewall`:
```
config include
      option name 'hak5admin'
      option enabled '0'          # Change from '1' to '0'
```
Then `fw4 restart`. Warnings about placeholder values are normal.

## Factory Reset
- Hold 'B' button while powering on; continue ~30 seconds until reset screen
- 'B' cancels, 'A' confirms. Takes ~15 minutes. Irreversible once confirmed.
- Removes ALL data: config, settings, handshakes, themes, loot, payloads

## Firmware Recovery
When factory reset is not possible or flash errors prevent normal boot:
1. Power off. Hold 'A' button, power on (hold ~3s). Green LED blinks slowly 5x then rapidly. Screen blank (normal).
2. Release 'A'. Connect USB-C. Navigate to `http://172.16.52.1`. Upload firmware.
3. ~15 minutes; red/green LEDs blink. Do not disconnect.
4. Recovery only rewrites boot flash — does NOT erase MMC (`/root`, themes, loot). Factory reset afterward to fully wipe.

## Software Updates
- **On-device**: Connect Wi-Fi with Internet > Settings > Updates > Check for Updates
- **SSH**: `scp firmware.bin root@172.16.52.1:/tmp/` then `INSTALL_FIRMWARE /tmp/firmware.bin`
- Upgrades preserve: system settings and `/root/` contents
- Upgrades do NOT preserve: third-party opkg packages (root overlay), manual filesystem modifications outside `/root/`

## Internal API (not DuckyScript)
Some payloads use `_pineap` directly (low-level):
```
_pineap RECON APS limit=N format=json
_pineap RECON CLIENTS limit=N format=json
_pineap RECON ISEARCH "SSID"
_pineap DEAUTH ap_mac client_mac channel
_pineap MONITOR mac any rate=N timeout=N
_pineap EXAMINE CANCEL
```

## Firmware Changelog
- 1.0.5: ALERT always plays configured ringtone; multi-word START_SPINNER fix; MIMIC commands added
- 1.0.6: Renamed MAC_FILTER→DEVICE_FILTER, SSID_FILTER→NETWORK_FILTER (old names still work), added *_ADD_FILE, removed ALERT_RINGTONE
- 1.0.7: Added HOPPING_START/STOP, LOOT_ARCHIVE, BATTERY_PERCENT/CHARGING, hidden SSID fixes, 24h clock

## VS Code Extension Shim
The extension deploys a shim to /tmp/_pager_ducky_shim.sh that reimplements
all interactive DuckyScript commands using `@@PAGER_REQ|type|id|data@@` markers
in stdout. VS Code intercepts these, shows native dialogs, writes responses to
`/tmp/_pager_resp_{id}`. Non-interactive commands (LED, VIBRATE, RINGTONE, etc.)
are logged to the output panel. Hardware-only commands (WIFI_*, PINEAPPLE_*, etc.)
run natively on device since the payload executes over SSH.

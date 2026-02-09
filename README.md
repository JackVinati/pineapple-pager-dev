# 🍍 Pineapple Pager Dev

Develop, deploy, run, and debug WiFi Pineapple Pager payloads directly from VS Code. No more copy-paste-SSH-fix-repeat cycle.

## Features

### ⚡ One-Click Deploy & Run
- **Ctrl+Shift+R** — Deploy and run the current payload instantly
- **Ctrl+Shift+D** — Deploy without running
- Auto-detects category from `# Category:` header comment
- Auto-fixes Windows line endings (CRLF → LF) before upload
- Auto-sets `chmod +x` permissions on the Pager
- Auto-creates the correct directory structure (`/root/payloads/user/<category>/<name>/payload.sh`)

### 📺 Live Output Streaming
- Real-time payload output in VS Code's Output panel
- See LOG messages as they appear on the Pager screen
- Stderr captured separately
- Exit code and duration reported on completion

### 🛑 Instant Stop
- **Ctrl+Shift+S** — Stop running payload immediately
- Sends SIGINT via PTY, then SIGKILL if needed
- Cleans up lingering processes

### 🎨 DuckyScript Syntax Highlighting
- Full syntax highlighting for DuckyScript commands (LOG, PROMPT, CONFIRMATION_DIALOG, etc.)
- Bash syntax support alongside DuckyScript
- Pager-specific paths and tools highlighted

### 💡 IntelliSense & Snippets
Type these prefixes and press Tab:
- `payload-header` — Full boilerplate with signal handling
- `log` — LOG with color picker
- `confirm` — CONFIRMATION_DIALOG
- `spinner` — START_SPINNER/STOP_SPINNER pair
- `btscan` / `blescan` — Bluetooth scan templates
- `mainloop` — Interruptible while loop
- `lootsave` — Save to loot directory
- And many more...

### 📁 Sidebar Views
- **Device Info** — Live hardware stats (model, memory, uptime, radios, BT)
- **Payloads** — Browse all payloads installed on the Pager
- **Loot** — Browse, preview, and download loot files

### 🔧 Payload Validation
- Detects missing shebang
- Warns about CRLF line endings
- Catches DuckyScript command case errors
- Reports unmatched quotes

### 📋 Payload Templates
`Ctrl+Shift+P` → "Pager: New Payload from Template"
- Basic, Reconnaissance, WiFi Audit, Bluetooth Scanner, Data Exfiltration, Interactive

## Quick Start

### 1. Install
```
# From VSIX file:
code --install-extension pineapple-pager-dev-1.0.0.vsix
```

### 2. Connect
- Click the **Pager: Offline** status bar item (bottom left)
- Or: `Ctrl+Shift+P` → "Pager: Connect to Device"
- Enter your SSH password when prompted

### 3. Create & Deploy
```bash
# Create a new payload
Ctrl+Shift+P → "Pager: New Payload from Template"

# Edit your payload.sh, then:
Ctrl+Shift+R → Deploy & Run
```

That's it. Your payload is uploaded, line endings are fixed, permissions are set, and it's running — all in one keystroke.

## Configuration

Open Settings (`Ctrl+,`) and search for "Pager":

| Setting | Default | Description |
|---------|---------|-------------|
| `pagerDev.host` | `172.16.52.1` | Pager IP address |
| `pagerDev.port` | `22` | SSH port |
| `pagerDev.username` | `root` | SSH user |
| `pagerDev.password` | *(empty)* | SSH password (prompts if empty) |
| `pagerDev.privateKeyPath` | *(empty)* | SSH key file (overrides password) |
| `pagerDev.autoDeployOnSave` | `false` | Auto-deploy payload.sh on save |
| `pagerDev.autoFixLineEndings` | `true` | Convert CRLF → LF before deploy |
| `pagerDev.defaultCategory` | `general` | Default payload category |
| `pagerDev.payloadBasePath` | `/root/payloads/user` | Payload root on Pager |
| `pagerDev.lootPath` | `/root/loot` | Loot directory on Pager |
| `pagerDev.showOutputOnRun` | `true` | Auto-show output panel |
| `pagerDev.deployTimeout` | `10` | Deploy timeout (seconds) |
| `pagerDev.runTimeout` | `300` | Max runtime (0 = unlimited) |

### SSH Key Authentication (Recommended)
```bash
# Generate key (if you don't have one)
ssh-keygen -t ed25519 -f ~/.ssh/pager_key

# Copy to Pager
ssh-copy-id -i ~/.ssh/pager_key root@172.16.52.1

# Set in VS Code settings:
# pagerDev.privateKeyPath: "~/.ssh/pager_key"
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+R` | Deploy & Run current payload |
| `Ctrl+Shift+D` | Deploy current payload |
| `Ctrl+Shift+S` | Stop running payload |

## How It Works

```
┌─────────────────────┐        SSH/SFTP        ┌──────────────────────┐
│   VS Code Editor    │◄──────────────────────►│  Pineapple Pager     │
│                     │                        │                      │
│  1. Edit payload.sh │  ──── Upload ────────► │  /root/payloads/     │
│  2. Ctrl+Shift+R    │  ──── chmod +x ──────► │    user/<cat>/<name>/ │
│  3. See live output  │  ◄─── stdout stream ── │      payload.sh      │
│  4. Ctrl+Shift+S    │  ──── SIGINT ────────► │  (running process)   │
│  5. Browse loot     │  ◄─── SFTP download ── │  /root/loot/         │
└─────────────────────┘                        └──────────────────────┘
```

## Building from Source

```bash
cd pineapple-pager-dev
npm install
npm run compile
npx vsce package
```


# WiFi Pineapple Pager — Complete Guide

> Source: https://docs.hak5.org/wifi-pineapple-pager/
> Downloaded: 2026-02-08

---

# Table of Contents

1. [Overview](#1-overview)
2. [Setup](#2-setup)
3. [Connecting the Pager](#3-connecting-the-pager)
   - [SSH](#31-ssh)
4. [Pineapple Functions](#4-pineapple-functions)
5. [Payloads](#5-payloads)
   - [Introduction to Payloads](#51-introduction-to-payloads)
   - [Introduction to Scripting](#52-introduction-to-scripting)
   - [Speedrunning Payload Dev](#53-speedrunning-payload-dev)
   - [DuckyScript for the Pager](#54-duckyscript-for-the-wifi-pineapple-pager)
6. [Pager DuckyScript Command Reference](#6-pager-duckyscript-command-reference)
   - [ALERT](#alert)
   - [CONFIG (PAYLOAD_GET/SET/DEL_CONFIG)](#config)
   - [CONFIRMATION_DIALOG](#confirmation_dialog)
   - [ERROR_DIALOG](#error_dialog)
   - [IP_PICKER](#ip_picker)
   - [LOG](#log)
   - [MAC_PICKER](#mac_picker)
   - [NUMBER_PICKER](#number_picker)
   - [PROMPT](#prompt)
   - [RINGTONE](#ringtone)
   - [START_SPINNER / STOP_SPINNER](#spinner)
   - [TEXT_PICKER](#text_picker)
   - [VIBRATE](#vibrate)
   - [WAIT_FOR_BUTTON_PRESS / WAIT_FOR_INPUT](#button_press)
7. [Pineapple DuckyScript Command Reference](#7-pineapple-duckyscript-command-reference)
8. [Wi-Fi, VPN, AutoSSH, DNS Spoof Commands](#8-wifi-vpn-autossh-dns-spoof-commands)
9. [Reset & Recovery](#9-reset--recovery)
10. [Payload Repository](#10-payload-repository)

---

# 1. Overview

The WiFi Pineapple Pager takes the industry-standard WiFi pentesting platform mobile, with 1990s pager-style flair. It runs OpenWRT and is expandable via a payload system that combines bash scripting with DuckyScript commands.

**Important Safety Information:** The device may get hot; keep it ventilated. Do not expose to water or extreme conditions. Do not disassemble. This device is for authorized auditing and security analysis only where permitted by local and international laws.

---

# 2. Setup

## Welcome

Connect the Pager via USB-C. The device uses IP `172.16.52.1` on the USB network. Follow the on-device setup wizard to configure your root password, Wi-Fi, and initial settings.

### Setup Steps
1. **Unboxing** — Charge via USB-C, power on
2. **On-Device Setup** — Follow the setup wizard on the Pager screen
3. **On-Device Tutorial** — Walk through the built-in tutorial

---

# 3. Connecting the Pager

The Pager accepts connections from:
- **USB-C** network (always `172.16.52.1`)
- **Management Access Point** Wi-Fi

## 3.1 SSH

The Pager supports standard SSH on TCP port **22**.

```
ssh root@172.16.52.1
```

Use the password configured during first-time setup.

### SCP File Transfer

```
scp payload.sh root@172.16.52.1:/root/payloads/user/general/my_payload/payload.sh
```

### Virtual Pager

A virtual pager environment is available for testing without physical hardware.

### Firewall

The Pager includes firewall configuration for controlling network access.

---

# 4. Pineapple Functions

The WiFi Pineapple Pager includes these core pentest functions:

| Function | Description |
|----------|-------------|
| **Recon** | Scan for nearby access points and clients |
| **Pineapple Open AP** | Create an open access point to attract clients |
| **Pineapple Evil WPA** | Create a WPA access point that mimics a target |
| **SSID Pool** | Impersonate multiple SSIDs simultaneously |
| **Handshake Collection** | Capture WPA handshakes for offline cracking |

---

# 5. Payloads

## 5.1 Introduction to Payloads

The Pager uses three types of payloads:

### Alert Payloads
Small, typically non-interactive scripts launched in response to environment conditions:
- WPA handshake capture
- Wi-Fi Denial of Service attacks
- A client connecting to a Pineapple access point
- Authentication details captured by a Pineapple access point

Alert payloads should be slim and minimal, as they may be launched repeatedly.

### User Payloads
Fully-featured interactive scripts run by the user from the Payload section of the dashboard. They expose the full range of DuckyScript commands for user interaction (text input, IP/MAC entry, confirmations, logs, spinners, etc.).

### Recon Payloads
Run against access points and clients discovered by the recon process. Also use the full range of DuckyScript commands.

### Payload Repository
Official Hak5 payload repository: https://github.com/hak5/wifipineapplepager-payloads/tree/master

Payloads are organized into `alert`, `recon`, and `user`, with further sub-categories.

---

## 5.2 Introduction to Scripting

WiFi Pineapple Payloads are written in **bash**. DuckyScript commands (always ALL CAPS) extend bash with Pager-specific functionality.

> **Note:** Payloads are bash scripts with DuckyScript commands — they are NOT the same as USB Rubber Ducky DuckyScript payloads.

### The Bash Shell
The Pager payload system uses bash. Payloads are run under a specially configured environment which always executes under bash.

### Editing Payloads
Payloads can be edited:
- On the Pager itself using `vim` or `nano`
- Using Hak5 Payload Studio (https://payloadstudio.hak5.org/)
- On a computer using VS Code, SublimeText, Notepad, etc.

### DuckyScript Commands
DuckyScript commands are always in ALL CAPITAL LETTERS. They take a small number of options and simplify complex tasks like user interaction through the Pineapple UI.

---

## 5.3 Speedrunning Payload Dev

### Interpreter Line
```bash
#!/bin/bash
```
Not required (the Pager always runs under bash) but including it won't cause problems.

### Comments
```bash
# This whole line is a comment
echo foo        # from here on is a comment
```

### Payload Information
```bash
# Title: An awesome payload title
# Description: A longer description about the payload functionality
# Author: Your Name <yourname@youremail.com>
```
Used by the UI to show payload info and give credit.

### Variables
```bash
# User-defined
name="John"
echo $name
echo ${name}

# Special variables
$?   # Exit status of last command
$!   # PID of last backgrounded process
$$   # PID of current script
$1   # First positional argument (not used in payloads)
```
Variable names are **case-sensitive**.

### Quotes
**Double quotes** (`"`) — treat as single argument, variables still expand:
```bash
myvar="beans"
echo "I want some ${myvar}"
```

**Single quotes** (`'`) — treat as literal, NO variable expansion:
```bash
echo 'This prints literally ${myvar}'
```

### Tests
```bash
value=10
if [ $value -lt 20 ]; then
    echo "Less than 20!"
fi
```

### Testing Command Success
```bash
# Method 1: Check $?
CONFIRMATION_DIALOG "Are you sure?"
if [ $? -ne 0 ]; then
    LOG "User said no"
    exit 0
fi

# Method 2: || (run on failure)
CONFIRMATION_DIALOG "Are you sure?" || {
    LOG "User said no"
    exit 0
}

# Method 3: Short form
CONFIRMATION_DIALOG "Are you sure?" || exit 0
```

### Getting Command Output
```bash
user_ip=$(IP_PICKER "Pick an IP" "1.2.3.4")
echo ${user_ip}
```

### Combining Output and Success
```bash
user_ip=$(IP_PICKER "Pick an IP" "1.2.3.4") || exit 0
```

### Exiting Payloads
Always include `exit 0` at the end to indicate success:
```bash
# Title: Example
# ... do some things
exit 0
```
If omitted, the status of the **last command** is used, which may report an error.

---

## 5.4 DuckyScript for the WiFi Pineapple Pager

DuckyScript commands are always ALL CAPS. Payloads combine bash scripting with DuckyScript commands. The commands themselves are often written in bash, though some are provided as binaries for performance.

---

# 6. Pager DuckyScript Command Reference

## ALERT

Raise a full-screen alert message.

**Syntax:**
```bash
ALERT "message"
```

**Behavior:** Displays text and returns immediately. As of firmware 1.0.5, always plays the configured alert ringtone.

**Example:**
```bash
ALERT "Notice me!"
```

---

## CONFIG

Persistent payload configuration using UCI.

### PAYLOAD_SET_CONFIG
```bash
PAYLOAD_SET_CONFIG [payload_name] [option] [value]
```

### PAYLOAD_GET_CONFIG
```bash
result=$(PAYLOAD_GET_CONFIG [payload_name] [option])
```
Returns option value. Exit code 0 on success, non-zero on failure.

### PAYLOAD_DEL_CONFIG
```bash
PAYLOAD_DEL_CONFIG [payload_name] [option]
```
Never returns an error — if not found, it's ignored.

**Example:**
```bash
PAYLOAD_SET_CONFIG demopayload host "1.2.3.4"

__config_host=$(PAYLOAD_GET_CONFIG demopayload host)
__host=$(TEXT_PICKER "Hostname" "${__config_host}") || exit 0
```

Configuration persists across firmware upgrades. Payload name must not contain spaces.

---

## CONFIRMATION_DIALOG

Ask the user to confirm an action (yes/no).

**Syntax:**
```bash
CONFIRMATION_DIALOG "text prompt"
```

**Behavior:** Pauses payload until user responds. Prints `1` if user continues, `0` if user cancels. Exits with error code on failure.

**Example:**
```bash
resp=$(CONFIRMATION_DIALOG "Continue the payload?") || exit 1
if [ "$resp" != "$DUCKYSCRIPT_USER_CONFIRMED" ]; then
    LOG "User cancelled!"
    exit 0
fi
```

---

## ERROR_DIALOG

Show error information to the user.

**Syntax:**
```bash
ERROR_DIALOG "error message"
```

---

## IP_PICKER

Ask the user to enter an IPv4 address via an optimized keyboard.

**Syntax:**
```bash
IP_PICKER "text prompt" "default_ip"
```

**Behavior:** Pauses payload. Returns IP as output. Exit code 0 if user continues, non-zero if cancelled.

**Example:**
```bash
__userip=$(IP_PICKER "Target IP" "1.2.3.4") || exit 0
__userip=$(IP_PICKER "No default IP" "") || exit 0
```

> A default IP should typically be provided. Use `""` for no default.

---

## LOG

Send data to the payload console.

**Syntax:**
```bash
LOG [color] "message"
```

**color** (optional): Any color name defined in the current theme.

**Behavior:** Sends message to payload console log and returns immediately (non-blocking).

**Example:**
```bash
LOG "Things are happening!"
LOG red "EXCITING things are happening!"
```

---

## MAC_PICKER

Ask the user to enter a MAC address.

**Syntax:**
```bash
MAC_PICKER "text prompt" "default_mac"
```

**Behavior:** Pauses payload. Returns MAC as output. Exit code 0 if continues, non-zero if cancelled.

**Example:**
```bash
__usermac=$(MAC_PICKER "Target MAC" "00:DE:AD:BE:EF:00") || exit 0
__usermac=$(MAC_PICKER "No default MAC" "") || exit 0
```

---

## NUMBER_PICKER

Ask the user to enter a number via an optimized numerical keyboard.

**Syntax:**
```bash
NUMBER_PICKER "text prompt" "default_number"
```

**Behavior:** Pauses payload. Returns number as output. Exit code 0 if continues, non-zero if cancelled.

**Example:**
```bash
__usernum=$(NUMBER_PICKER "Timeout (in seconds)" "5") || exit 0
__usernum=$(NUMBER_PICKER "No default number" "") || exit 0
```

---

## PROMPT

Raise a modal alert and wait for the user to continue.

**Syntax:**
```bash
PROMPT "message"
```

**Behavior:** Pauses payload until user acknowledges.

---

## RINGTONE

Play a ringtone or ringtone file, with optional vibration.

**Syntax:**
```bash
RINGTONE [ringtone_name_or_file]
```

---

## SPINNER

### START_SPINNER
Show an indeterminate progress spinner.

**Syntax:**
```bash
__spinnerid=$(START_SPINNER "message")
```

**Returns:** Spinner ID (must be captured to cancel later).

> **Firmware 1.0.4 or older:** Message must be a single word, otherwise the spinner can't be cancelled. Fixed in 1.0.5.

### STOP_SPINNER
Cancel a running spinner.

**Syntax:**
```bash
STOP_SPINNER ${__spinnerid}
```

**Example:**
```bash
__spinnerid=$(START_SPINNER "Thinking")
sleep 5
STOP_SPINNER ${__spinnerid}
```

---

## TEXT_PICKER

Ask the user to enter free-form text.

**Syntax:**
```bash
TEXT_PICKER "text prompt" "default_text"
```

**Behavior:** Pauses payload. Returns text as output. Exit code 0 if continues, non-zero if cancelled.

**Example:**
```bash
__host=$(TEXT_PICKER "Target hostname" "foo-client") || exit 0
__demo=$(TEXT_PICKER "No default text" "") || exit 0
```

> Default text should typically be provided. Use `""` for no default.

---

## VIBRATE

Activate the haptic vibration motor in sync with a ringtone file.

**Syntax:**
```bash
VIBRATE [short|long]
```

---

## BUTTON_PRESS

### WAIT_FOR_BUTTON_PRESS
Wait for the user to press a specific physical button.

### WAIT_FOR_INPUT
Wait for the user to press any physical button.

---

# 7. Pineapple DuckyScript Command Reference

These commands interact with the WiFi Pineapple access point and recon functions.

| Command | Description |
|---------|-------------|
| `FIND_CLIENT_IP` | Find IP of a client connected to a Pineapple AP |
| `PINEAPPLE_DEAUTH_CLIENT` | Deauthenticate a client from a Wi-Fi network |
| `PINEAPPLE_DEVICE_FILTER_ADD` | Add MAC to Pineapple AP device filters |
| `PINEAPPLE_DEVICE_FILTER_ADD_FILE` | Add MAC list from file to device filters |
| `PINEAPPLE_DEVICE_FILTER_CLEAR` | Clear all device filter entries |
| `PINEAPPLE_DEVICE_FILTER_DEL` | Delete a MAC from device filters |
| `PINEAPPLE_DEVICE_FILTER_LIST` | List device filter entries |
| `PINEAPPLE_DEVICE_FILTER_MODE` | Control device filter mode |
| `PINEAPPLE_EXAMINE_BSSID` | Lock to the channel of a known AP |
| `PINEAPPLE_EXAMINE_CHANNEL` | Lock to a specific channel |
| `PINEAPPLE_EXAMINE_RESET` | Resume normal channel hopping |
| `PINEAPPLE_HOPPING_START` | Resume recon channel hopping |
| `PINEAPPLE_HOPPING_STOP` | Stop recon channel hopping |
| `PINEAPPLE_LOOT_ARCHIVE` | Archive current loot in timestamped directory |
| `PINEAPPLE_MIMIC_ENABLE` | Enable open AP mimic mode |
| `PINEAPPLE_MIMIC_DISABLE` | Disable open AP mimic mode |
| `PINEAPPLE_NETWORK_FILTER_ADD` | Add SSID to network filters |
| `PINEAPPLE_NETWORK_FILTER_ADD_FILE` | Add SSID list from file to network filters |
| `PINEAPPLE_NETWORK_FILTER_CLEAR` | Clear all network filter entries |
| `PINEAPPLE_NETWORK_FILTER_DEL` | Delete SSID from network filters |
| `PINEAPPLE_NETWORK_FILTER_LIST` | List network filter entries |
| `PINEAPPLE_NETWORK_FILTER_MODE` | Control network filter mode |
| `PINEAPPLE_RECON_NEW` | Start a new recon session |
| `PINEAPPLE_SET_BANDS` | Configure Wi-Fi bands for recon |
| `PINEAPPLE_SSID_POOL_ADD` | Add SSID to impersonation pool |
| `PINEAPPLE_SSID_POOL_ADD_FILE` | Add SSID list from file to pool |
| `PINEAPPLE_SSID_POOL_CLEAR` | Clear the SSID pool |
| `PINEAPPLE_SSID_POOL_COLLECT_START` | Start auto-collecting probe requests |
| `PINEAPPLE_SSID_POOL_COLLECT_STOP` | Stop auto-collecting |
| `PINEAPPLE_SSID_POOL_DELETE` | Delete SSID from pool |
| `PINEAPPLE_SSID_POOL_LIST` | List pool contents |
| `PINEAPPLE_SSID_POOL_START` | Start advertising pool SSIDs |
| `PINEAPPLE_SSID_POOL_STOP` | Stop advertising pool SSIDs |
| `WIFI_OPEN_AP` | Configure the open access point |
| `WIFI_OPEN_AP_CLEAR` | Clear open AP configuration |
| `WIFI_OPEN_AP_DISABLE` | Disable open AP |
| `WIFI_OPEN_AP_HIDE` | Set open AP to hidden |
| `WIFI_PCAP_START` | Start optimized packet capture |
| `WIFI_PCAP_STOP` | Stop packet capture |
| `WIFI_WPA_AP` | Configure the WPA access point |
| `WIFI_WPA_AP_CLEAR` | Clear WPA AP configuration |
| `WIFI_WPA_AP_DISABLE` | Disable WPA AP |
| `WIFI_WPA_AP_HIDE` | Set WPA AP to hidden |
| `WIGLE_LOGIN` | Fetch a Wigle login token |
| `WIGLE_LOGOUT` | Remove Wigle API tokens |
| `WIGLE_START` | Start a Wigle log |
| `WIGLE_STOP` | Stop a Wigle log |
| `WIGLE_UPLOAD` | Upload a Wigle log |
| `GPS_CONFIGURE` | Configure USB GPS serial port/speed |
| `GPS_GET` | Get current GPS coordinates |
| `GPS_LIST` | List available GPS serial ports |
| `INSTALL_FIRMWARE` | Validate and install firmware |
| `BATTERY_CHARGING` | Return battery charging state |
| `BATTERY_PERCENT` | Return battery percentage |
| `DISABLE_DISPLAY` | Turn off the Pager display |
| `ENABLE_DISPLAY` | Turn the Pager display on |
| `DPADLED_CONFIG` | Configure default DPAD LED color |

---

# 8. Wi-Fi, VPN, AutoSSH, DNS Spoof Commands

## Wi-Fi Configuration
| Command | Description |
|---------|-------------|
| `WIFI_CONNECT` | Connect to a Wi-Fi network as client |
| `WIFI_DISCONNECT` | Disconnect from client mode |
| `WIFI_CLEAR` | Clear client Wi-Fi configuration |
| `WIFI_WAIT` | Wait for client Wi-Fi to connect |
| `WIFI_MGMT_AP` | Configure the management AP |
| `WIFI_MGMT_AP_CLEAR` | Clear management AP config |
| `WIFI_MGMT_AP_DISABLE` | Disable management AP |
| `WIFI_MGMT_AP_HIDE` | Set management AP to hidden |

## VPN Configuration
| Command | Description |
|---------|-------------|
| `OPENVPN_CONFIGURE` | Provision OpenVPN config |
| `OPENVPN_ENABLE` | Enable OpenVPN |
| `OPENVPN_DISABLE` | Disable OpenVPN |
| `WIREGUARD_CONFIGURE` | Configure Wireguard VPN |
| `WIREGUARD_ENABLE` | Enable Wireguard |
| `WIREGUARD_DISABLE` | Disable Wireguard |

## AutoSSH
| Command | Description |
|---------|-------------|
| `AUTOSSH_CONFIGURE` | Configure AutoSSH |
| `AUTOSSH_ENABLE` | Enable AutoSSH |
| `AUTOSSH_DISABLE` | Disable AutoSSH |
| `AUTOSSH_CLEAR` | Clear AutoSSH config |
| `AUTOSSH_ADD_PORT` | Add a port forward |
| `SSH_ADD_KNOWN_HOST` | Add a known SSH host |

## DNS Spoof
| Command | Description |
|---------|-------------|
| `DNSSPOOF_ENABLE` | Enable DNS spoofing |
| `DNSSPOOF_DISABLE` | Disable DNS spoofing |
| `DNSSPOOF_ADD_HOST` | Add a host to DNS spoofing |
| `DNSSPOOF_DEL_HOST` | Delete a host from DNS spoofing |
| `DNSSPOOF_CLEAR` | Clear DNS spoofing config |

## Miscellaneous
| Command | Description |
|---------|-------------|
| `LED` | Change the LED |
| `SYSTEM_DNS` | Override system DNS |
| `PAYLOAD_GET_CONFIG` | Get a payload config value |
| `PAYLOAD_SET_CONFIG` | Set a payload config value |
| `PAYLOAD_DEL_CONFIG` | Delete a payload config value |

---

# 9. Reset & Recovery

## Factory Reset
Available from the device menu. Resets all settings to factory defaults.

## Firmware Recovery
For extreme cases where the device is unresponsive. See the Hak5 docs for the recovery procedure:
https://docs.hak5.org/wifi-pineapple-pager/recovery/firmware-recovery/

---

# 10. Payload Repository

Official Hak5 Pager payload repository:

**https://github.com/hak5/wifipineapplepager-payloads/tree/master**

Organized into `alert/`, `recon/`, and `user/` with sub-categories.

> Payloads are provided for educational purposes only. Use of third-party payloads is at your own risk.

---

# Quick Reference Card

## Payload Template
```bash
#!/bin/bash
# Title: My Payload
# Description: What it does
# Author: Your Name
# Category: general

CONFIRMATION_DIALOG "Start the payload?" || exit 0

__target=$(IP_PICKER "Target IP" "192.168.1.1") || exit 0
__timeout=$(NUMBER_PICKER "Timeout (seconds)" "30") || exit 0

LOG green "Starting scan of ${__target}..."

__spinnerid=$(START_SPINNER "Scanning")
sleep ${__timeout}
STOP_SPINNER ${__spinnerid}

LOG green "Scan complete!"
PROMPT "Done! Press continue."

exit 0
```

## File Locations on Device
```
/root/payloads/user/          # User payloads
/root/payloads/alert/         # Alert payloads
/root/payloads/recon/         # Recon payloads
/root/loot/                   # Captured loot data
```

## SSH Quick Connect
```
ssh root@172.16.52.1          # USB connection
```

---

*Source: https://docs.hak5.org/wifi-pineapple-pager/ — © 2026 Hak5 LLC*


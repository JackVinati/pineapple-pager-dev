import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { SSHManager, getConfig } from './sshManager';

class LootItem extends vscode.TreeItem {
    constructor(
        public readonly itemLabel: string,
        public readonly remotePath: string,
        public readonly isDir: boolean,
        public readonly size: number,
        collapsible: vscode.TreeItemCollapsibleState
    ) {
        super(itemLabel, collapsible);

        if (isDir) {
            this.contextValue = 'lootFolder';
            this.iconPath = new vscode.ThemeIcon('folder');
        } else {
            this.contextValue = 'lootFile';
            this.iconPath = this.getFileIcon(itemLabel);
            this.description = this.fmtSize(size);
            this.tooltip = `${remotePath}\n${this.fmtSize(size)}`;
            this.command = { command: 'pager.previewLoot', title: 'Preview', arguments: [this] };
        }
    }

    private getFileIcon(name: string): vscode.ThemeIcon {
        const ext = path.extname(name).toLowerCase();
        if (ext === '.json') { return new vscode.ThemeIcon('json'); }
        if (ext === '.txt' || ext === '.log') { return new vscode.ThemeIcon('file-text'); }
        if (ext === '.csv') { return new vscode.ThemeIcon('table'); }
        if (ext === '.pcap' || ext === '.cap' || ext === '.pcapng') { return new vscode.ThemeIcon('pulse'); }
        if (ext === '.22000' || ext === '.hcappx' || ext === '.hccapx') { return new vscode.ThemeIcon('key'); }
        return new vscode.ThemeIcon('file');
    }

    private fmtSize(b: number): string {
        if (b < 1024) { return `${b}B`; }
        if (b < 1048576) { return `${(b / 1024).toFixed(1)}KB`; }
        return `${(b / 1048576).toFixed(1)}MB`;
    }

    isBinaryFormat(): boolean {
        const ext = path.extname(this.itemLabel).toLowerCase();
        return ['.pcap', '.cap', '.pcapng', '.22000', '.hcappx', '.hccapx'].includes(ext);
    }
}

export class LootExplorerProvider implements vscode.TreeDataProvider<LootItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<LootItem | undefined>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private ssh: SSHManager) {
        ssh.onConnectionChange((connected: boolean) => {
            if (connected) { setTimeout(() => this.refresh(), 2000); }
            else { this.refresh(); }
        });
    }

    refresh(): void { this._onDidChangeTreeData.fire(undefined); }

    getTreeItem(element: LootItem): vscode.TreeItem { return element; }

    async getChildren(element?: LootItem): Promise<LootItem[]> {
        if (!this.ssh.connected) { return []; }
        const cfg = getConfig();
        const remotePath = element ? element.remotePath : cfg.lootPath;

        try {
            const items = await this.ssh.listDir(remotePath);
            return items
                .filter(i => !i.name.startsWith('.'))
                .sort((a, b) => {
                    if (a.isDir !== b.isDir) { return a.isDir ? -1 : 1; }
                    return a.name.localeCompare(b.name);
                })
                .map(i => new LootItem(
                    i.name, `${remotePath}/${i.name}`, i.isDir, i.size,
                    i.isDir ? vscode.TreeItemCollapsibleState.Collapsed : vscode.TreeItemCollapsibleState.None
                ));
        } catch (err: any) {
            if (err.message?.includes('No such file')) { return []; }
            return [new LootItem(`Error: ${err.message}`, '', false, 0, vscode.TreeItemCollapsibleState.None)];
        }
    }

    async downloadLoot(item: LootItem): Promise<void> {
        if (!item || item.isDir) { return; }
        const defaultUri = vscode.Uri.file(path.join(
            vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || require('os').homedir(),
            'pager-loot', item.itemLabel
        ));
        const saveUri = await vscode.window.showSaveDialog({ defaultUri, filters: { 'All Files': ['*'] } });
        if (!saveUri) { return; }

        try {
            const content = await this.ssh.readFile(item.remotePath);
            const dir = path.dirname(saveUri.fsPath);
            if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }
            fs.writeFileSync(saveUri.fsPath, content);
            const doc = await vscode.workspace.openTextDocument(saveUri);
            await vscode.window.showTextDocument(doc);
            vscode.window.showInformationMessage(`Downloaded: ${item.itemLabel}`);
        } catch (err: any) {
            vscode.window.showErrorMessage(`Download failed: ${err.message}`);
        }
    }

    async previewLoot(item: LootItem): Promise<void> {
        if (!item || item.isDir) { return; }

        // Binary files (pcap, handshake) get a hex dump preview
        if (item.isBinaryFormat()) {
            await this.previewHex(item);
            return;
        }

        try {
            const content = await this.ssh.readFile(item.remotePath);
            const tmpDir = path.join(require('os').tmpdir(), 'pager-loot');
            if (!fs.existsSync(tmpDir)) { fs.mkdirSync(tmpDir, { recursive: true }); }
            const tmpFile = path.join(tmpDir, item.itemLabel);
            fs.writeFileSync(tmpFile, content);
            const doc = await vscode.workspace.openTextDocument(tmpFile);
            await vscode.window.showTextDocument(doc, { preview: true });
        } catch (err: any) {
            vscode.window.showErrorMessage(`Preview failed: ${err.message}`);
        }
    }

    private async previewHex(item: LootItem): Promise<void> {
        try {
            // Get file info summary for pcap files
            let header = `# ${item.itemLabel}\n# Size: ${item.size} bytes\n`;
            const ext = path.extname(item.itemLabel).toLowerCase();

            if (['.pcap', '.cap', '.pcapng'].includes(ext)) {
                // Try to get tcpdump summary if available
                try {
                    const summary = await this.ssh.exec(
                        `tcpdump -r "${item.remotePath}" -c 20 2>/dev/null | head -20 || echo "(tcpdump not available)"`
                    );
                    header += `# Type: Packet Capture\n\n## Packet Summary (first 20)\n\`\`\`\n${summary.trim()}\n\`\`\`\n\n`;
                } catch {
                    header += `# Type: Packet Capture\n\n`;
                }
            } else if (['.22000', '.hcappx', '.hccapx'].includes(ext)) {
                header += `# Type: Hashcat Handshake\n# Format: ${ext.replace('.', '').toUpperCase()}\n\n`;
            }

            // Get hex dump
            const hexDump = await this.ssh.readFileHex(item.remotePath, 1024);
            const content = `${header}## Hex Dump (first 1024 bytes)\n\`\`\`\n${hexDump}\n\`\`\`\n`;

            const tmpDir = path.join(require('os').tmpdir(), 'pager-loot');
            if (!fs.existsSync(tmpDir)) { fs.mkdirSync(tmpDir, { recursive: true }); }
            const tmpFile = path.join(tmpDir, `${item.itemLabel}.md`);
            fs.writeFileSync(tmpFile, content);
            const doc = await vscode.workspace.openTextDocument(tmpFile);
            await vscode.window.showTextDocument(doc, { preview: true });
            // Switch to markdown preview
            vscode.commands.executeCommand('markdown.showPreview', doc.uri);
        } catch (err: any) {
            vscode.window.showErrorMessage(`Hex preview failed: ${err.message}`);
        }
    }

    async deleteLoot(item: LootItem): Promise<void> {
        if (!item) { return; }
        const what = item.isDir ? `folder "${item.itemLabel}" and all contents` : `"${item.itemLabel}"`;
        const confirm = await vscode.window.showWarningMessage(
            `Delete ${what}? This cannot be undone.`, { modal: true }, 'Delete'
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

    dispose() { this._onDidChangeTreeData.dispose(); }
}

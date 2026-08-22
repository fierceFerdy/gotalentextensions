import * as vscode from 'vscode';
import { shortcutColumns, Shortcut } from './shortcutsData';

export class ShortcutsPanel {
    public static currentPanel: ShortcutsPanel | undefined;
    public static readonly viewType = 'goTalentShortcuts';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];

    public static createOrShow(context: vscode.ExtensionContext) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (ShortcutsPanel.currentPanel) {
            ShortcutsPanel.currentPanel._panel.reveal(column);
            ShortcutsPanel.currentPanel._update();
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            ShortcutsPanel.viewType,
            'Keyboard Shortcuts',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(context.extensionUri, 'assets')
                ]
            }
        );

        ShortcutsPanel.currentPanel = new ShortcutsPanel(panel, context.extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._update();

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
    }

    public dispose() {
        ShortcutsPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview): string {
        const styleUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'assets', 'shortcuts.css')
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'assets', 'shortcuts.js')
        );

        const nonce = getNonce();
		const glyphs: Record<string, string> = { win: '⊞', click: '<i class="fas fa-computer-mouse"></i>', plus: '+' };

        const renderShortcut = (shortcut: Shortcut) => {
            const keysHtml = shortcut.plain
                ? shortcut.keys.split('+').map(part => escapeHtml(part.trim()).replace(/click/gi, glyphs.click)).join(' + ')
                : shortcut.keys
                    .split(/\s*,\s*|\s+\/\s+/)
                    .map(combo => `<span class="key-combo">${combo.split('+').map(k => {
                        const trimmed = k.trim();
                        // the click icon isn't a keyboard key, so keep it out of <kbd>
                        if (trimmed.toLowerCase() === 'click') {
                            return glyphs.click;
                        }
                        const glyph = glyphs[trimmed.toLowerCase()];
                        return `<kbd>${glyph ?? escapeHtml(trimmed)}</kbd>`;
                    }).join('<span class="plus">+</span>')}</span>`)
                    .join('<span class="or">or</span>');
            return `
                <div class="shortcut-row" data-search="${escapeHtml((shortcut.description + ' ' + shortcut.keys).toLowerCase())}">
                    <div class="shortcut-keys">${keysHtml}</div>
                    <div class="shortcut-description">${escapeHtml(shortcut.description)}</div>
                </div>`;
        };

        const columnsHtml = shortcutColumns.map(column => {
            const sectionsHtml = column.sections.map(section => {
                const groupsHtml = section.groups.map(group => `
                    <div class="group" data-group>
                        ${group.subtitle ? `<h3 class="group-subtitle">${escapeHtml(group.subtitle)}<span class="arrow">↘</span></h3>` : ''}
                        <div class="shortcut-list">
                            ${group.shortcuts.map(renderShortcut).join('')}
                        </div>
                        ${group.note ? `<div class="note">${escapeHtml(group.note)}</div>` : ''}
                    </div>`).join('');

                return `
                <section class="section" data-category>
                    <h2>${escapeHtml(section.title)}</h2>
                    <div class="groups${column.splitGroups ? ' groups-split' : ''}">
                        ${groupsHtml}
                    </div>
                </section>`;
            }).join('');

            return `<div class="column${column.fullWidth ? ' column-full' : ''}">${sectionsHtml}</div>`;
        }).join('');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; font-src ${webview.cspSource}; img-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
    <link href="${styleUri}" rel="stylesheet">
    <title>Keyboard Shortcuts</title>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>Keyboard Shortcuts</h1>
        </header>

        <div class="search-bar">
            <input type="text" id="search" placeholder="Type to filter shortcuts..." autofocus>
            <span id="no-results" class="no-results" hidden>No matching shortcuts</span>
        </div>

        <div class="categories">
            ${columnsHtml}
        </div>
    </div>

    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
    }
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function escapeHtml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

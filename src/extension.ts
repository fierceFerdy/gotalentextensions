import * as vscode from 'vscode';
import { WelcomePanel } from './welcomePanel';

export function activate(context: vscode.ExtensionContext) {
    // Register the command to show the welcome page manually
    const showCommand = vscode.commands.registerCommand('goTalent.show', () => {
        WelcomePanel.createOrShow(context);
    });
    context.subscriptions.push(showCommand);

    // Register command to apply recommended settings
    const applySettingsCommand = vscode.commands.registerCommand('goTalent.applySettings', async () => {
        await applyRecommendedSettings();
        vscode.window.showInformationMessage('Recommended settings applied to this workspace.');
    });
    context.subscriptions.push(applySettingsCommand);

    // Auto-disable the default welcome page on first run
    initializeWelcomeSettings(context);

    // Show the custom welcome page if no workspace is open
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
        WelcomePanel.createOrShow(context);
    }
}

async function initializeWelcomeSettings(context: vscode.ExtensionContext): Promise<void> {
    const hasInitialized = context.globalState.get<boolean>('welcomeInitialized');

    if (!hasInitialized) {
        const config = vscode.workspace.getConfiguration();
        await config.update('workbench.startupEditor', 'none', vscode.ConfigurationTarget.Global);
        await context.globalState.update('welcomeInitialized', true);
    }
}

async function applyRecommendedSettings(): Promise<void> {
    const settings: Record<string, unknown> = {
        'editor.fontFamily': 'Inconsolata',
        'editor.fontSize': 14,
        'editor.insertSpaces': false,
        'editor.detectIndentation': false,
        'explorer.confirmDelete': false,
        'explorer.confirmDragAndDrop': false,
        'git.confirmSync': false,
        'editor.glyphMargin': false,
        'editor.wordWrap': 'on',
        'liveSassCompile.settings.showOutputWindowOn': 'Error',
        'editor.minimap.enabled': false,
        'editor.wordSeparators': "`~!@#%^&*()-=+[{]}\\|;:'\",.<>/?",
        'liveServer.settings.CustomBrowser': 'chrome',
        'workbench.externalBrowser': 'chrome',
		'workbench.iconTheme': 'material-icon-theme',
        'workbench.colorTheme': 'Dark Modern',
        'workbench.preferredDarkColorTheme': 'Dark Modern',
        'workbench.colorCustomizations': {
            '[Default Dark Modern]': {
                'editor.background': '#191d21',
                'tab.inactiveBackground': '#191d21',
                'sideBar.background': '#111518',
                'editorGroupHeader.tabsBackground': '#111518',
                'statusBar.background': '#111518',
                'tab.activeBackground': '#0a0d10',
                'activityBar.background': '#0a0d10',
                'titleBar.activeBackground': '#0a0d10'
            }
        },
        'files.exclude': {
            '.gitattributes': true,
            'package-lock.json': true
        },
        'workbench.sideBar.location': 'right',
        'editor.folding': false
    };

    for (const [key, value] of Object.entries(settings)) {
        await vscode.workspace.getConfiguration().update(
            key,
            value,
            vscode.ConfigurationTarget.Workspace
        );
    }
}

export function deactivate() {}

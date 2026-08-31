import * as vscode from 'vscode';
import { WelcomePanel } from './welcomePanel';
import { ShortcutsPanel } from './shortcutsPanel';

export function activate(context: vscode.ExtensionContext) {
    // Register the command to show the welcome page manually
    const showCommand = vscode.commands.registerCommand('goTalent.show', () => {
        WelcomePanel.createOrShow(context);
    });
    context.subscriptions.push(showCommand);

    // Register the command to show the keyboard shortcuts page
    const showShortcutsCommand = vscode.commands.registerCommand('goTalent.showShortcuts', () => {
        ShortcutsPanel.createOrShow(context);
    });
    context.subscriptions.push(showShortcutsCommand);

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
        'editor.detectIndentation': false,
        'editor.folding': false,
        'editor.glyphMargin': false, // undo this if you want to use the debugger
        'editor.insertSpaces': false,
        'editor.minimap.enabled': false,
        'editor.wordSeparators': "`~!@#%^&*()-=+[{]}\\|;:'\",.<>/?", // also select $ with double click
        'editor.wordWrap': 'on',
        'explorer.confirmDelete': false,
        'explorer.confirmDragAndDrop': false,
        'files.exclude': {
            '.gitattributes': true,
            'package-lock.json': true
        },
		"git.autofetch": true,
        'git.confirmSync': false,
		// "git.openRepositoryInParentFolders": "always",
        'liveSassCompile.settings.showOutputWindowOn': 'Error',
        'liveServer.settings.CustomBrowser': 'chrome',
		"liveServer.settings.donotVerifyTags": true,
		"liveServer.settings.donotShowInfoMsg": true,
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
		// "breadcrumbs.enabled": false,
		"terminal.integrated.defaultProfile.windows": "Command Prompt",
		// "workbench.editor.useModal": "off", // Forgot what it does, need to test
        'workbench.sideBar.location': 'right',
		"chat.titleBar.openInAgentsWindow.enabled": false, // Hide annoying 'open in agents' button
		"chat.disableAIFeatures": true,
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

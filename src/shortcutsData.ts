export interface Shortcut {
    keys: string;
    description: string;
    plain?: boolean;
}

export interface ShortcutGroup {
    subtitle?: string;
    note?: string;
    shortcuts: Shortcut[];
}

export interface ShortcutSection {
    title: string;
    groups: ShortcutGroup[];
}

export interface ShortcutColumn {
    fullWidth?: boolean;
    splitGroups?: boolean;
    sections: ShortcutSection[];
}

// Content and layout mirror http://127.0.0.1:5501/pages/intro/keyboard-shortcuts.html
export const shortcutColumns: ShortcutColumn[] = [
    {
        fullWidth: true,
        splitGroups: true,
        sections: [
            {
                title: 'The absolute basics',
                groups: [
                    {
                        shortcuts: [
                            { keys: 'CTRL+C', description: 'Copy' },
                            { keys: 'CTRL+V', description: 'Paste' },
                            { keys: 'CTRL+X', description: 'Cut' },
                            { keys: 'CTRL+Z', description: 'Undo' },
                            { keys: 'CTRL+A', description: 'Select all' },
                            { keys: 'CTRL+S', description: 'Save' },
                            { keys: 'CTRL+F', description: 'Find/search' },
                            { keys: 'CTRL+Plus', description: 'Zoom in' },
                            { keys: 'CTRL+-', description: 'Zoom out' },
                            { keys: 'ALT+F4', description: 'Cheat mode' },
                            { keys: 'F11', description: 'Fullscreen' },
                        ]
                    },
                    {
                        shortcuts: [
                            { keys: 'ALT+Tab', description: 'Switch application' },
                            { keys: 'CTRL+Tab', description: 'Go to next tab' },
                            { keys: 'CTRL+T', description: 'Open new tab' },
                            { keys: 'CTRL+W', description: 'Close current tab' },
                            { keys: 'CTRL+SHIFT+T', description: 'Reopen closed tab' },
                            { keys: 'Win+V', description: 'Paste from history' },
                            { keys: 'Win+S', description: 'Search for program' },
                            { keys: 'Win+D', description: 'Switch to/from desktop' },
                            { keys: 'Win+L', description: 'Lock screen' },
                        ],
                        note: 'You can sometimes add SHIFT to modify/reverse the action (i.e. ALT+Tab)'
                    }
                ]
            }
        ]
    },
    {
        sections: [
            {
                title: 'Text editors',
                groups: [
                    {
                        shortcuts: [
                            { keys: 'word+Click+Click', description: 'Select word', plain: true },
                            { keys: 'word+Click+Click+Click', description: 'Select line', plain: true },
                        ]
                    },
                    {
                        subtitle: 'Browser specific',
                        shortcuts: [
                            { keys: 'CTRL+L', description: 'Focus address bar' },
                            { keys: 'F12', description: 'Open Dev Tools' },
                            { keys: 'CTRL+R', description: 'Refresh' },
                            { keys: 'CTRL+SHIFT+R', description: 'Hard refresh (clears cache)' },
                        ]
                    },
                    {
                        subtitle: 'Tricks with arrows',
                        shortcuts: [
                            { keys: 'CTRL+→', description: 'To end of word' },
                            { keys: 'CTRL+←', description: 'To start of word' },
                        ],
                        note: 'Add SHIFT to also select'
                    },
                    {
                        subtitle: 'And some more..',
                        shortcuts: [
                            { keys: 'Home', description: 'To line start' },
                            { keys: 'End', description: 'To line end' },
                            { keys: 'CTRL+Home', description: 'To document start' },
                            { keys: 'CTRL+End', description: 'To document end' },
                        ],
                        note: 'Try some things and see what happens'
                    }
                ]
            }
        ]
    },
    {
        sections: [
            {
                title: 'Visual Studio Code',
                groups: [
                    {
                        shortcuts: [
                            { keys: 'ALT+Click', description: 'Multiple cursors' },
                            { keys: 'Middle Click+Drag', description: 'Multiple cursors', plain: true },
                            { keys: 'CTRL+P', description: 'Navigate to file' },
                            { keys: 'CTRL+SHIFT+P', description: 'Command palette' },
                            { keys: 'CTRL+SHIFT+Space', description: 'Trigger parameter hints' },
                            { keys: 'CTRL+/', description: 'Toggle comment' },
                            { keys: 'CTRL+N', description: 'New file' },
                            { keys: 'CTRL+Enter', description: 'Go to new line' },
                        ]
                    },
                    {
                        subtitle: 'Less common but still useful',
                        shortcuts: [
                            { keys: 'CTRL+B', description: 'Toggle sidebar' },
                            { keys: 'CTRL+SHIFT+`', description: 'Terminal' },
                            { keys: 'CTRL+H', description: 'Find & replace' },
                            { keys: 'CTRL+SHIFT+D', description: 'Duplicate line' },
                            { keys: 'ALT+Up', description: 'Move line up' },
                            { keys: 'ALT+Down', description: 'Move line down' },
                            { keys: 'ALT+Z', description: 'Toggle word wrap' },
                            { keys: 'ALT+Click+Folder', description: 'Expand/Collapse folder' },
                            { keys: 'CTRL+SHIFT+K', description: 'Delete line' },
                            { keys: 'CTRL+SHIFT+D', description: 'Duplicate line' },
                        ]
                    }
                ]
            },
            {
                title: 'Windows explorer (and more)',
                groups: [
                    {
                        shortcuts: [
                            { keys: 'CTRL+SHIFT+N', description: 'Create new folder' },
                            { keys: 'F2', description: 'Rename file' },
                            { keys: 'Enter', description: 'Open file' },
                            { keys: 'Del', description: 'Delete file' },
                            { keys: 'CTRL+Click', description: 'Select multiple files' },
                            { keys: 'SHIFT+Click', description: 'Select from first to last file' },
                        ]
                    }
                ]
            }
        ]
    }
];


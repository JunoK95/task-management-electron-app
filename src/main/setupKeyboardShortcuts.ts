import { dialog, globalShortcut } from 'electron';

export default function setupKeyboardShortcuts(): void {
  // Register a global keyboard shortcut
  globalShortcut.register('CommandOrControl+Alt+R', () => {
    dialog.showMessageBox({ message: 'Hello World!' });
  });

  return;
}

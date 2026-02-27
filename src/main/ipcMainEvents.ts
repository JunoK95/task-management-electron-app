import { ipcMain } from 'electron';
import nodeNotifier from 'node-notifier';

export default function ipcMainEvents(): void {
  ipcMain.on('notify', (_event, payload: unknown) => {
    if (
      typeof payload !== 'object' ||
      payload === null ||
      typeof (payload as Record<string, unknown>).title !== 'string' ||
      typeof (payload as Record<string, unknown>).message !== 'string'
    ) {
      return;
    }

    const { title, message } = payload as { title: string; message: string };

    if (!title.trim() || !message.trim()) return;

    nodeNotifier.notify(
      {
        title: `${title} ${Date.now()}`, // force unique ID
        message,
        sound: true,
        wait: false
      },
      (err) => {
        if (err) console.error('Notifier error:', err);
      }
    );
  });
}

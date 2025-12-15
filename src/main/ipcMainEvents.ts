import { ipcMain } from 'electron';
import nodeNotifier from 'node-notifier';

export default function ipcMainEvents(): void {
  ipcMain.on('ping', () => console.log('pong'));

  // Listen for notification requests from renderer
  ipcMain.on('notify', (event, { title, message }) => {
    console.log('Notification request received:', title, message, event && 'event');
    nodeNotifier.notify(
      {
        title: `${title} ${Date.now()}`, // force unique ID
        message,
        sound: true,
        wait: false
      },
      (err, response, metadata) => {
        if (err) console.error('Notifier error:', err);
        else console.log('Notifier result:', response, metadata);
      }
    );
  });
}

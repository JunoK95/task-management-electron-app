import { app, shell, BrowserWindow, nativeTheme } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import setupKeyboardShortcuts from './setupKeyboardShortcuts';
import setupSystemTrayShortcuts from './setupSystemTrayShortcuts';
import ipcMainEvents from './ipcMainEvents';

// ❗ MUST BE AT THE VERY TOP — BEFORE app.whenReady()
app.disableHardwareAcceleration();

app.setAppUserModelId('com.yourcompany.sticky-note-app');
app.setName('Sticky Note');

const preloadPath = join(__dirname, '../preload', 'index.js');

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 1300,
    height: 840,
    minWidth: 500,
    minHeight: 400,

    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',

    trafficLightPosition: { x: 12, y: 12 },

    vibrancy: 'under-window',
    visualEffectState: 'active',

    show: false, // 👈 better for ready-to-show
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.on('ready-to-show', () => {
    console.log('Main window ready to show');
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

app.whenReady().then(() => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();

  electronApp.setAppUserModelId('com.electron');

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  setupSystemTrayShortcuts(app);
  setupKeyboardShortcuts();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMainEvents();

import { app, shell, BrowserWindow, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import setupKeyboardShortcuts from './setupKeyboardShortcuts'
import setupSystemTrayShortcuts from './setupSystemTrayShortcuts'
import ipcMainEvents from './ipcMainEvents'

app.setAppUserModelId('com.yourcompany.sticky-note-app')
app.setName('Sticky Note')

const preloadPath = join(__dirname, '../preload', 'index.js')
console.log('Preload path:', preloadPath)

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 500,
    minHeight: 400,
    backgroundColor: nativeTheme.shouldUseDarkColors ? '#1e1e1e' : '#ffffff',

    // ✅ Native window chrome
    trafficLightPosition: { x: 12, y: 12 },

    // ✅ Rounded corners & shadows (macOS Ventura+)
    vibrancy: 'under-window', // or 'sidebar', 'medium-light', 'window'
    visualEffectState: 'active',
    show: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    console.log('Main window ready to show')
    mainWindow.show()
    mainWindow.focus()
    app.focus({ steal: true })
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('App is ready')
  if (BrowserWindow.getAllWindows().length === 0) createWindow()

  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    console.log('Browser window created')
    optimizer.watchWindowShortcuts(window)
  })
  app.on('browser-window-focus', () => console.log('BrowserWindow focused'))

  setupSystemTrayShortcuts(app)
  setupKeyboardShortcuts()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// Set up IPC main event listeners
ipcMainEvents()

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

import { App, BrowserWindow, Menu, nativeImage, Tray } from 'electron'
import { join } from 'path'

const ICONPATH = join(__dirname, '../../resources', 'trayIconTemplate.png')

export default function setupKeyboardShortcuts(app: App): void {
  let tray: Tray | null = null

  const image = nativeImage.createFromPath(ICONPATH)
  image.setTemplateImage(true)
  tray = new Tray(image)
  tray.setToolTip('Sticky Notes')
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show App',
        click: () => {
          console.log('Show App clicked')
          BrowserWindow.getAllWindows().forEach((win) => {
            if (win.isMinimized()) win.restore()
            win.show()
            win.focus()
          })
        }
      },
      { label: 'Quit', click: () => app.quit() }
    ])
  )

  return
}

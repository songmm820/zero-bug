import { app, BrowserWindow } from 'electron'
import { dirname } from 'path'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: dirname('electron/preload.js')
    }
  })

  win.loadURL('http://localhost:1420')
}

app.whenReady().then(() => {
  createWindow()
})

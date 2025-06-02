import { app, BrowserWindow } from 'electron'
import { dirname } from 'path'

const env = process.env.NODE_ENV || 'development'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: dirname('electron/preload.js')
    }
  })

  if (env === 'development') {
    win.loadURL('http://localhost:1420')
    // 打开开发工具
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    /**
     * 通常在 macOS 上，当点击 dock 中的应用程序图标时，如果没有其他，打开的窗口，那么程序会重新创建一个窗口。
     */
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

/**
 * 除了 macOS 外，当所有窗口都被关闭的时候退出程序。
 * 因此，通常对程序和它们在任务栏上的图标来说，应当保持活跃状态，直到用户使用 Cmd + Q 退出。
 */
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

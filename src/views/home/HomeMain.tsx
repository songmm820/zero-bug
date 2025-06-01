import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'
import { Window } from '@tauri-apps/api/window'
import { getCurrentWindow } from '@tauri-apps/api/window'

/**
 * Views：Main
 * @author songmm
 */
function HomeMain() {
  const [invokeMessage, setInvokeMessage] = useState<string>('')

  // 调用插件
  async function callPlugin() {
    const response = await invoke('greet', { message: 'tauri' })
    setInvokeMessage(response as string)
  }

  // 新建window窗口
  async function createWindow() {
    const appWindow = new Window('app', {
      resizable: false,
      decorations: false,
      alwaysOnTop: true,
      transparent: true,
      width: 400,
      height: 600
    })

    appWindow.once('tauri://created', function () {
      // window successfully created
      alert('创建成功')
    })

    appWindow.once('tauri://error', function () {
      // an error happened creating the window
    })

    await appWindow.emit('some-event', 'data')

    await appWindow.listen('some-event', function () {})
  }

  // 居中窗口
  async function centerWindow() {
    const appWindow = getCurrentWindow()
    await appWindow.center()
  }

  // 获取当前网络局域网设备
  useEffect(() => {}, [])
  return (
    <main className="flex-1 p-4 flex flex-col items-center justify-center">
      <div>{invokeMessage}</div>
      <button onClick={() => callPlugin()}>invoke命令</button>
      <button onClick={() => createWindow()}>创建窗口</button>
      <button onClick={() => centerWindow()}>窗口居中</button>
    </main>
  )
}

export default HomeMain

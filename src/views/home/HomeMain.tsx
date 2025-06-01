import { useEffect, useState } from 'react'
import { invoke } from '@tauri-apps/api/core'

/**
 * Views：Main
 * @author songmm
 */
function HomeMain() {
  const [invokeRes, setInvokeRes] = useState<unknown>(null)

  // 调用插件
  async function callPlugin() {
    const response = await invoke('greet', { name: 'tauri' })
    setInvokeRes(response)
  }

  // 获取当前网络局域网设备
  useEffect(() => {}, [])
  return (
    <main className="flex-1 p-4">
      <div>{JSON.stringify(invokeRes)}</div>
      <button onClick={() => callPlugin()}>调用插件</button>
    </main>
  )
}

export default HomeMain

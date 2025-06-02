import { useEffect } from 'react'
/**
 * Views：Main
 * @author songmm
 */
function HomeMain() {
  // 调用插件
  async function callPlugin() {}

  // 新建window窗口
  async function createWindow() {}

  // 居中窗口
  async function centerWindow() {}

  // 获取当前网络局域网设备
  useEffect(() => {}, [])
  return (
    <main className="flex-1 p-4 flex flex-col items-center justify-center">
      <button onClick={() => callPlugin()}>invoke命令</button>
      <button onClick={() => createWindow()}>创建窗口</button>
      <button onClick={() => centerWindow()}>窗口居中</button>
    </main>
  )
}

export default HomeMain

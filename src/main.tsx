import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/main.css'
import '@/styles/style.css'
import App from '@/App'
import { ConfigProvider } from '@arco-design/web-react'
import { Toaster } from 'react-hot-toast'
// 自动更新脚本
import '@/utils/auto-update'
// axios 实例
import '@/axios/request'
import { ComponentConfig } from '@arco-design/web-react/es/ConfigProvider/interface'
// 日志工具
import Logger from '@/utils/logger'
// 存储工具
import { LocalStorageInstance, SessionStorageInstance } from '@/utils/storage-util'

// 全局声明
if (typeof globalThis.Tools === 'undefined') {
  globalThis.Tools = {
    Logger: Logger,
    LocalStorage: LocalStorageInstance,
    SessionStorage: SessionStorageInstance
  }
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

// Arco Design 全局组件配置
const globalConfig: ComponentConfig = {
  /* 按钮 */
  Button: {
    shape: 'round'
  },
  /* 抽屉 */
  Drawer: {
    autoFocus: false
  }
}

root.render(
  <>
    <React.StrictMode>
      <ConfigProvider size="large" autoInsertSpaceInButton componentConfig={globalConfig}>
        <App />
      </ConfigProvider>
      <Toaster />
    </React.StrictMode>
  </>
)

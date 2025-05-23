import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/styles/main.css'
import '@/styles/style.css'
import App from '@/App'
import { Toaster } from 'react-hot-toast'
// 自动更新脚本
import '@/utils/auto-update.tsx'
// axios 实例
import '@/axios/request.ts'
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

root.render(
  <>
    <React.StrictMode>
      <App />
      <Toaster />
    </React.StrictMode>
  </>
)

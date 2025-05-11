import React from 'react'
import ReactDOM from 'react-dom/client'

/**
 * DOM 工具：将组件挂载到指定的 DOM 容器
 * @param component React 组件
 * @param target 挂载目标容器，默认为 document.body
 * @returns 一个卸载函数，用于卸载该组件和挂在的dom
 */
export function mountAnyWhere(
  component: React.ReactNode,
  target: HTMLElement | null = document.body
): {
  unmount: () => void
  mountDiv: HTMLElement
} {
  // 创建一个新的 div 元素用于挂载
  const mountDiv = document.createElement('div')
  // 随机获取一个id标识 以便更容易识别该容器
  mountDiv.id = Math.random().toString(36).substring(2, 15)

  // 确保目标容器存在
  const validTarget = target || document.body
  validTarget.appendChild(mountDiv)

  // 使用 createRoot 来挂载组件
  const root = ReactDOM.createRoot(mountDiv)
  root.render(component)

  // 返回一个卸载函数，和这个dom节点
  const unmount = () => {
    root.unmount()
    mountDiv.remove()
  }
  return {
    unmount,
    mountDiv
  }
}

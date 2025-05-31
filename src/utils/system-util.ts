/**
 * App 工具
 * @author songmm
 */

import { platform } from '@tauri-apps/plugin-os'

/**
 * 获取当前系统类型
 */
export function getOS() {
  try {
    return platform()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return 'web'
  }
}

/**
 * 获取当前系统语言
 */
export function getLang() {
  return navigator.language
}

/**
 * 主题模式切换
 * @author songmm
 */

import { THEME_MODE_KEY } from '@/constants/app'

/**
 * Ts 枚举：主题模式
 */
export enum themeMode {
  light = 'light',
  dark = 'dark'
}

export default function useTheme() {
  // 获取当前主题
  const theme = Tools.LocalStorage.get(THEME_MODE_KEY) || themeMode.dark
  // 设置主题
  const setTheme = (value: string) => {
    // 设置html的data-theme属性
    document.documentElement.setAttribute('data-theme', value)
    Tools.LocalStorage.set(THEME_MODE_KEY, value)
  }
  return {
    theme,
    setTheme
  }
}

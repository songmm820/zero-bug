/**
 * 主题模式切换
 * @author songmm
 */

import { THEME_MODE_KEY } from '@/constants/app'

/**
 * Ts 枚举：主题模式
 */
export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export default function useTheme() {
  // 获取当前主题
  const theme = (Tools.LocalStorage.get(THEME_MODE_KEY) as ThemeMode) || ThemeMode.dark
  // 设置主题
  const setTheme = (value: ThemeMode) => {
    Tools.LocalStorage.set(THEME_MODE_KEY, value)
    const root = window.document.documentElement
    root.classList.add(value)
  }
  return {
    theme,
    setTheme
  }
}

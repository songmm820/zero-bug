/**
 * 主题模式切换
 * @author songmm
 */
import { THEME_MODE_KEY } from '@/constants/app'
import { useEffect, useState } from 'react'

/**
 * Ts 枚举：主题模式
 */
export enum ThemeMode {
  light = 'light',
  dark = 'dark'
}

export default function useTheme() {
  // 获取当前主题并初始化状态
  const getInitialTheme = () => {
    return (Tools.LocalStorage.get(THEME_MODE_KEY) as ThemeMode) || ThemeMode.dark
  }

  // 使用useState来管理当前主题
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme)

  const toggleTheme = () => {
    const root = window.document.documentElement
    // 移除旧的主题类
    root.classList.remove(ThemeMode.light, ThemeMode.dark)
    // 添加新的主题类
    root.classList.add(theme)
  }

  // 设置主题
  const setTheme = (value: ThemeMode) => {
    setThemeState(value)
    // 保存到localStorage
    Tools.LocalStorage.set(THEME_MODE_KEY, value)
  }

  useEffect(() => {
    toggleTheme()

    return () => {}
  }, [theme])

  return { theme, setTheme }
}

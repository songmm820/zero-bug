/**
 * 主题模式切换
 * @author songmm
 */

import { THEME_MODE_KEY } from '@/constants/app'
import { LocalStorageUtil } from '@/utils/storage-util'

export default function useTheme() {
  // 获取当前主题
  const theme = LocalStorageUtil.get(THEME_MODE_KEY) || 'light'
  // 设置主题
  const setTheme = (value: string) => {
    document.body.setAttribute('data-theme', value)

    LocalStorageUtil.set(THEME_MODE_KEY, value)
  }
  return {
    theme,
    setTheme
  }
}

/**
 * App Entry Point
 * @author songmm
 */

import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { useAtom } from 'jotai'
import router from './router/router-config'
import { updateScreenSizeAtom } from '@/jotai-atoms/app-store'
import { debounce } from 'lodash'
import useTheme from '@/hooks/use-theme.ts'

function App() {
  // 更新屏幕尺寸
  const [, updateScreenSize] = useAtom(updateScreenSizeAtom)

  // 获取当前主题模式
  const { theme, setTheme } = useTheme()

  /**
   * 监听窗口大小变化
   */
  const handleResize = () => {
    const newWidth = window.innerWidth
    const newHeight = window.innerHeight
    updateScreenSize({ screenWidth: newWidth, screenHeight: newHeight })
  }

  useEffect(() => {
    // 监听窗口大小变化
    window.addEventListener('resize', debounce(handleResize, 300))
    setTheme(theme)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

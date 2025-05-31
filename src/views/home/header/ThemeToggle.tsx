/**
 * Views：header 主题切换
 * @author songmm
 */

import IconPark from '@/components/IconPark/IconPark'
import useTheme, { ThemeMode } from '@/hooks/use-theme'

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // 切换主题
  const onToggleTheme = () => {
    if (theme === ThemeMode.dark) {
      setTheme(ThemeMode.light)
    } else {
      setTheme(ThemeMode.dark)
    }
  }

  return (
    <>
      <IconPark icon={theme === ThemeMode.dark ? 'sun-one' : 'moon'} onClick={onToggleTheme} />
    </>
  )
}

export default ThemeToggle

/**
 * Views：登录界面
 * @author songmm
 */

import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/jotai-atoms/app-store'
import useTheme from '@/hooks/use-theme'
import useTimer from '@/hooks/use-timer.ts'

function SignView() {
  // 获取APP原子信息
  const appInfoAtom = useAtomValue(appStateAtom)
  const { theme, setTheme } = useTheme()
  const { time, start, stop } = useTimer(60, 1)

  const toggleDarkMode = () => {
    setTheme('dark')
  }

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white">
      <div className="text-primary">{JSON.stringify(appInfoAtom)}</div>
      <p />
      <div className="flex">{theme}</div>
      <button onClick={toggleDarkMode}>切换暗色模式</button>
      <div className="flex">{time}</div>
      <button onClick={start}>开始定时器</button>
      <button onClick={stop}>停止定时器</button>
    </div>
  )
}

export default SignView

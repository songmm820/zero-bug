/**
 * 计时器
 * @author songmm
 */

import { useEffect, useState } from 'react'

/**
 * 获取验计时器
 * @param time 验证码计时
 * @param step 步长
 */
export default function useTimer(time: number, step: number = 1) {
  // 当前剩余时间
  const [timeLeft, setTimeLeft] = useState(time)
  // 是否正在计时
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    let timer = null
    // 如果计时没有开始，或者已经结束，不做处理
    if (isCounting && timeLeft > 0) {
      // 启动定时器，每隔 `step` 时间减少一次剩余时间
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - step)
      }, step * 1000) // step 是秒，需要乘以 1000 转换为毫秒
    }
    // 清除定时器
    return () => {
      if (timer) {
        clearInterval(timer)
      }
    }
  }, [isCounting, timeLeft, step])

  // 启动计时器
  const start = () => {
    setIsCounting(true)
  }

  // 停止计时器
  const stop = () => {
    setIsCounting(false)
  }

  // 重置计时器
  const reset = () => {
    setIsCounting(false)
    setTimeLeft(time) // 重置为初始时间
  }

  return {
    time: timeLeft,
    isCounting,
    start,
    stop,
    reset
  }
}

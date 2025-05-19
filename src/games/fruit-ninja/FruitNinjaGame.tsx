/**
 * 游戏：水果忍者
 * @author songmm
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'
import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/jotai-atoms/app-store'
import startGame from '@/games/fruit-ninja/start-game'

function FruitNinjaGame() {
  const game = useRef<Phaser.Game>()

  // 获取APP原子信息
  const appInfoAtom = useAtomValue(appStateAtom)

  useLayoutEffect(() => {
    game.current = startGame('game-container', appInfoAtom.screenWidth, appInfoAtom.screenHeight)

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  useEffect(() => {
    // 监听屏幕尺寸变化，重新调整游戏窗口大小
    if (!game) return
    const { screenWidth, screenHeight } = appInfoAtom
    game.current?.scale.resize(screenWidth, screenHeight)
    Tools.Logger.info(`重新设置游戏窗口尺寸：${screenWidth} | ${screenHeight}`)
  }, [appInfoAtom.screenWidth, appInfoAtom.screenHeight])

  return <div id="game-container"></div>
}

export default FruitNinjaGame

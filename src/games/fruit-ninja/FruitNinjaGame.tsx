/**
 * 游戏：水果忍者
 * @author songmm
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'
import { useAtomValue } from 'jotai'
import { appStateAtom } from '@/jotai-atoms/app-store'
import StartGame from '@/games/fruit-ninja/StartGame'

function FruitNinjaGame() {
  const game = useRef<Phaser.Game>()

  // 获取APP原子信息
  const appInfoAtom = useAtomValue(appStateAtom)

  useLayoutEffect(() => {
    game.current = StartGame('game-container')

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  useEffect(() => {
    game.current?.scale.resize()
  }, [appInfoAtom.screenWidth, appInfoAtom.screenHeight])

  return <div id="game-container"></div>
}

export default FruitNinjaGame

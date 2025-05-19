/**
 * 游戏：水果忍者
 * @author songmm
 */

import { useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'
import startGame from '@/games/fruit-ninja/start-game'

function FruitNinjaGame() {
  const game = useRef<Phaser.Game>()

  useLayoutEffect(() => {
    game.current = startGame('game-container', 640, 480)

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  return <div id="game-container"></div>
}

export default FruitNinjaGame

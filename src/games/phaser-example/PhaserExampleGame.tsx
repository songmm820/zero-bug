/**
 * 游戏：Phaser 官方入门示例
 * @author songmm
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'
import startGame from '@/games/phaser-example/start-game'

function PhaserExampleGame() {
  const game = useRef<Phaser.Game>()

  useLayoutEffect(() => {
    game.current = startGame('game-container')

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  useEffect(() => {}, [])

  return <div id="game-container"></div>
}

export default PhaserExampleGame

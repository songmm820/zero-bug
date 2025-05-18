/**
 * 游戏：Phaser 官方入门示例
 * @author songmm
 */

import { useEffect, useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'

import StartGame from '@/games/phaser-example/StartGame.ts'

function PhaserGame() {
  const game = useRef<Phaser.Game>()

  useLayoutEffect(() => {
    game.current = StartGame('games-container')

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  useEffect(() => {}, [])

  return <div id="game-container"></div>
}

export default PhaserGame

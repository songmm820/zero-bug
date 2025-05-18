import { useEffect, useLayoutEffect, useRef } from 'react'
import Phaser from 'phaser'

import StartGame from '@/game/StartGame.ts'

function PhaserGame() {
  const game = useRef<Phaser.Game>()

  useLayoutEffect(() => {
    game.current = StartGame('game-container')

    return () => {
      game.current?.destroy(true)
    }
  }, [])

  useEffect(() => {}, [])

  return <div id="game-container"></div>
}

export default PhaserGame

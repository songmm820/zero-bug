import Phaser, { AUTO, Game } from 'phaser'
import { BootScene } from '@/games/phaser-example/scenes/BootScene'

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

/**
 * 启动游戏
 * @param parent 游戏dom容器
 */
const StartGame = (parent: string, width: number, height: number) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: width,
    height: height,
    parent: parent,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 300 },
        debug: false
      }
    },
    scene: [new BootScene('BootStart')]
  }
  return new Game(config)
}

export default StartGame

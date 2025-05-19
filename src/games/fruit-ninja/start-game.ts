/**
 * 游戏：启动函数
 * @author songmm
 */

import Phaser, { AUTO, Game } from 'phaser'
import { BootScene } from './scenes/boot-scene'
import { SCENE_KEY } from './recource-constant'

//  Find out more information about the Game Config at:
//  https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig

/**
 * 启动游戏
 * @param parent 游戏dom容器
 */
const startGame = (parent: string, width: number, height: number) => {
  const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: width,
    height: height,
    parent: parent,
    // 透明
    transparent: true,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 300 },
        debug: false
      }
    },
    scene: [new BootScene(SCENE_KEY.BOOT)]
  }
  return new Game(config)
}

export default startGame

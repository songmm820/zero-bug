/**
 * 游戏启动场景
 * @author songmm
 */

import { Scene } from 'phaser'

export class Boot extends Scene {
  constructor() {
    super('Boot')
  }

  preload() {
    this.load.image('background', 'assets/bg.png')
  }

  create() {
    this.scene.start('Preloader')
  }
}

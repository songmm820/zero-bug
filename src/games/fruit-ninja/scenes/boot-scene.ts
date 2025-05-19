/**
 * 场景：boot 启动
 * @author songmm
 */

import Phaser from 'phaser'
import { STATIC_RESOURCES } from '@/games/fruit-ninja/recource-constant'
import { SceneUtils } from '@/games/utils/scene-util'

export class BootScene extends Phaser.Scene {
  constructor(key: string) {
    super({
      key: key
    })
  }

  preload() {
    // 加载静态资源
    STATIC_RESOURCES.forEach((item) => {
      this.load.image(item.key, item.url)
    })
  }

  create() {
    SceneUtils.fadeIn(this)
    // 获取游戏的宽度和高度 700 * 550
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    this.homePending(width, height)
  }

  /**
   * 待机动画
   */
  homePending(width: number, height: number) {
    this.add.image(0, 0, 'background').setOrigin(0, 0).setDisplaySize(width, height)

    const mask = this.add.image(0, -100, 'home-mask').setOrigin(0, 0).setDisplaySize(width, 200)

    const logo = this.add.image(20, -100, 'logo').setOrigin(0, 0).setDisplaySize(200, 100)

    this.tweens.add({
      targets: [mask, logo],
      y: 0,
      duration: 400,
      ease: 'Linear',
      repeat: 0,
      yoyo: false
    })
  }
}

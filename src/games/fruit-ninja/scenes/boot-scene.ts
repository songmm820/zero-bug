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
    this.add.image(0, 0, 'background')
  }

  create() {
    SceneUtils.fadeIn(this)
  }
}

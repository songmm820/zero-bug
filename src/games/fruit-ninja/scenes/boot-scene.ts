/**
 * 场景：boot 启动
 * @author songmm
 */

import { SCENE_KEY, STATIC_RESOURCES } from '@/games/fruit-ninja/recource-constant'
import BaseScene from './base-scene'

export class BootScene extends BaseScene {
  constructor() {
    super(SCENE_KEY.BOOT)
  }

  preload() {
    this.loading()
    // 加载静态资源
    STATIC_RESOURCES.forEach((item) => {
      this.load.image(item.key, item.url)
    })
    setTimeout(() => {
      this.closeLoading()
    }, 1500)
  }

  create() {}
}

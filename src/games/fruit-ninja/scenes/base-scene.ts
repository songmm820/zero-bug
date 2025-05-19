/**
 * 场景：场景基类
 * @author songmm
 */

import Phaser, { Scene } from 'phaser'

export default class BaseScene extends Scene {
  private loadingText!: Phaser.GameObjects.Text

  constructor(key: string) {
    super({
      key: key
    })
  }

  /**
   * Loading
   */
  loading() {
    const { width, height } = this.game.canvas
    // 显示加载文本
    this.loadingText = this.add
      .text(width / 2, height / 2 - 50, '加载中......', {
        fontSize: '18px'
      })
      .setOrigin(0.5, 0.5)
  }

  /**
   * 关闭Loading
   */
  closeLoading() {
    this.loadingText.destroy()
  }
}

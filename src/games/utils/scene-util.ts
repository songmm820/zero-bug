/**
 * 场景工具类
 * @author songmm
 */

import Phaser from 'phaser'

export class SceneUtils {
  /**
   * 场景淡入
   * @param scene 场景
   * @param duration  动画持续时间
   */
  static fadeIn(scene: Phaser.Scene, duration = 500) {
    scene.cameras.main.fadeIn(duration, 0, 0, 0)
  }

  /**
   * 场景淡出
   * @param scene 场景
   * @param duration 动画持续时间
   * @param onCompleteCallback 动画完成回调
   */
  static fadeOut(scene: Phaser.Scene, duration = 1000, onCompleteCallback?: () => void) {
    const blackScreen = scene.add.rectangle(400, 300, 800, 600, 0x000000)
    blackScreen.setOrigin(0.5)
    blackScreen.setAlpha(1)

    scene.tweens.add({
      targets: blackScreen,
      alpha: 0,
      duration: duration,
      ease: 'Cubic.Out',
      onComplete: () => {
        if (onCompleteCallback) onCompleteCallback()
      }
    })
  }
}

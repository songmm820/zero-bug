/**
 * 场景：游戏入口
 * @author songmm
 */
import Phaser, { Scene } from 'phaser'
import SpriteWithDynamicBody = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
import Group = Phaser.Physics.Arcade.Group
import ArcadePhysicsCallback = Phaser.Types.Physics.Arcade.ArcadePhysicsCallback
import Text = Phaser.GameObjects.Text
import StaticGroup = Phaser.Physics.Arcade.StaticGroup

export class BootScene extends Scene {
  private width!: number
  private height!: number
  private player!: SpriteWithDynamicBody
  private score: number = 0
  private gameOver: boolean = false
  private stars!: Group
  private scoreText!: Text
  private platforms!: StaticGroup
  private bombs!: Group

  constructor(currentSceneKey: string) {
    super({
      key: currentSceneKey
    })
  }

  // 创建场景
  private createPlatforms() {
    this.add.image(this.width / 2, this.height / 2, 'sky').setDisplaySize(this.width, this.height)
    // 创建静态建筑物平台
    const platforms = this.physics.add.staticGroup()
    platforms.create(400, 600, 'ground').setScale(2).refreshBody()
    platforms.create(600, 400, 'ground')
    platforms.create(50, 250, 'ground')
    platforms.create(750, 220, 'ground')
    this.platforms = platforms
  }

  // 创建玩家
  private createPlayer() {
    // 创建玩家
    this.player = this.physics.add.sprite(100, 450, 'dude')
    // 玩家重力
    this.player.body.setGravityY(300)
    // 设置角色在碰撞后的反弹效果。
    // 0.2 表示反弹力度是 0 到 1 之间，0 意味着完全不反弹，1 表示反弹力度非常强。
    this.player.setBounce(0.2)
    // 设置角色在碰撞后的摩擦力。
    this.player.setCollideWorldBounds(true)
    // 玩家与静态建筑平台允许发生碰撞
    this.physics.add.collider(this.player, this.platforms)
    // 玩家向左
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    // 玩家转向
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    })
    // 玩家向右
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })
  }

  // 创建星星
  private createStars() {
    // 添加星星
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 70, y: 0, stepX: 120 }
    })
    // 设置starts children设置每个星星的弹性
    const children = this.stars.getChildren()
    children.forEach((star) => {
      const sprite = star as Phaser.Physics.Arcade.Sprite
      sprite.setX(Phaser.Math.Between(50, this.width))
      sprite.setY(0)
      sprite.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
    // 设置星星与平台的碰撞
    this.physics.add.collider(this.stars, this.platforms)
  }

  // 收集星星
  private collectStar: ArcadePhysicsCallback = (_player, star) => {
    const starSprite = star as SpriteWithDynamicBody
    // 禁用星星的物理身体，表示它被收集掉了
    starSprite.disableBody(true, true)
    // 更新分数
    this.score += 10
    this.updateScore(this.score)
    // 如果星星全部被收集
    if (this.stars.countActive(true) === 0) {
      // 创建新的星星
      this.createStars()
    }
  }

  // 创建炸弹
  private createBombs() {
    // 添加炸弹
    this.bombs = this.physics.add.group({
      key: 'bomb',
      repeat: 2,
      setXY: { x: 50, y: 0, stepX: 200 }
    })
    // 炸弹与平台的碰撞
    this.physics.add.collider(this.bombs, this.platforms)
  }

  // 碰到炸弹
  private hitBomb: ArcadePhysicsCallback = (player, bombs) => {
    const bombSprite = bombs as SpriteWithDynamicBody
    const playerSprite = player as SpriteWithDynamicBody
    // 禁用炸弹，表示它被触发掉了
    bombSprite.disableBody(true, true)
    this.score -= 10
    this.updateScore(this.score)
    this.physics.pause()
    playerSprite.setTint(0xff0000)
    playerSprite.anims.play('turn')
    this.gameOver = true
  }

  // 更新分数
  private updateScore(score: number) {
    this.scoreText.setText('Score: ' + score)
  }

  preload() {
    this.load.image('sky', 'assets/phaser-example/sky.png')
    this.load.image('ground', 'assets/phaser-example/platform.png')
    this.load.image('star', 'assets/phaser-example/star.png')
    this.load.image('bomb', 'assets/phaser-example/bomb.png')
    this.load.spritesheet('dude', 'assets/phaser-example/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    // 获取游戏的宽度和高度
    this.width = this.cameras.main.width
    this.height = this.cameras.main.height
    // 创建地面
    this.createPlatforms()
    // 创建计分板
    this.scoreText = this.add.text(16, 16, `score: ${this.score}`, { fontSize: '32px' })
    // 创建玩家
    this.createPlayer()
    // 创建星星
    this.createStars()
    // 创建炸弹
    this.createBombs()
    // 检测玩家和星星是否发生重叠
    this.physics.add.overlap(this.player, this.stars, this.collectStar, () => {}, this)
    // 检测玩家和炸弹是否发生重叠
    this.physics.add.overlap(this.player, this.bombs, this.hitBomb, () => {}, this)
  }

  update() {
    // 如果游戏结束
    if (this.gameOver) {
      return
    }

    if (!this.player) {
      return
    }
    // 键盘管理器
    const cursors = this.input.keyboard?.createCursorKeys()

    if (cursors?.left.isDown) {
      this.player.setVelocityX(-320)
      this.player.anims.play('left', true)
    } else if (cursors?.right.isDown) {
      this.player.setVelocityX(320)
      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)
      this.player.anims.play('turn')
    }
    if (cursors?.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-500)
    }
  }
}

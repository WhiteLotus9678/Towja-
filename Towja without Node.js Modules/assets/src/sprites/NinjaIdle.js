import Phaser from 'phaser'

export default class NinjaIdle extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player-main', 0)
    this.animations.add('idle', [24], 4, true)
    this.animations.play('idle', 0, true)
    this.anchor.setTo(0.5, 1.0)
  }
}

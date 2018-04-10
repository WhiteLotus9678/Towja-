import Phaser from 'phaser'

export default class PopsDesk extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'popsDesk', 0)
    this.animations.add('default', [0, 1, 2, 3], 10, false)
    this.animations.play('default', 5, true)
    this.anchor.setTo(0.5, 0.5)
  }
}

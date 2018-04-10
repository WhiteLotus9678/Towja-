import Phaser from 'phaser'

export default class A extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'A', 0)
    this.animations.add('default', [0, 1, 2], 10, true)
    this.animations.play('default', 5, true)
    this.anchor.setTo(0.5, 0.5)
  }
}

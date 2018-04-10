import Phaser from 'phaser'

export default class PopsBoss extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'pops-head', 0)
    this.animations.add('default', [0], 10, true)
    this.animations.play('default', 5, true)
    this.anchor.setTo(0.5, 0.5)
  }
}

/* globals __DEV__ */
import Phaser from 'phaser'
import { sequentialNumArray } from '../utils.js'

export default class DyingPops extends Phaser.Sprite {
  constructor ({game, x, y}) {
    super(game, x, y, 'pops-dying', 0)

    this.anchor.setTo(0.5, 0.5)

    this.animations.add('Dying', sequentialNumArray(0, 8), 5, false)
    this.animations.getAnimation('Dying').onComplete.add(() => {
      this.winGame()
    }, this)

    this.animations.play('Dying')
  }

  winGame () {
    this.game.state.start('Win')
  }
}

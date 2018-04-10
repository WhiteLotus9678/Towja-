import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
  }

  preload () {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
  }

  create () {
    // Displays the 'You Win' picture
    this.win = this.game.add.sprite(config.gameWidth / 2, config.gameHeight / 2, 'Win')
    this.win.anchor.setTo(0.5, 0.5)
    this.win.scale.setTo(0.20, 0.20)
    this.win.fixedToCamera = true
  }
}

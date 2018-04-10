import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
  }

  prelaod () {
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
  }

  create () {
    // Add the image for the title screen background
    this.title = this.game.add.sprite(config.gameWidth / 2, config.gameHeight + 430, 'TowerTitleScreen')
    this.title.anchor.setTo(0.5, 0.5)
    this.title.scale.setTo(0.67, 0.67)

    // Add the image for controls
    this.controls = this.game.add.image(config.gameWidth / 2, 385, 'controlsText')
    this.controls.anchor.setTo(0.5, 0.5)
    this.controls.scale.setTo(0.38, 0.38)

    var controls = new Phaser.Button(this.game, config.gameWidth / 2, 120, 'controlsBtn', function () {}, this, 0, 0, 0)
    controls.anchor.setTo(0.5, 0.5)
    this.game.add.existing(controls)

    // Create the 'Back' buttton
    var backBtn = new Phaser.Button(this.game, config.gameWidth / 2, 620, 'backBtn', function () {
      this.game.state.start('TitleMenu')
    }, this, 1, 0, 0)
    backBtn.anchor.setTo(0.5, 0.5)
    this.game.add.existing(backBtn)
  }
}

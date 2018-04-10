import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
  }

  init () {}

  preload () {
    // Load the audio sprite into the level
    this.sounds = this.game.add.audioSprite('sounds')
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
    // Load all of the assets for the game over screen
    this.load.image('gameOver', 'assets/images/gameOver.png')
  }

  create () {
    this.setupKeyboard()

    this.saveState = this.cache.getJSON('saveState')

    // Displays the 'Game Over' picture
    this.gameOver = this.game.add.sprite(config.gameWidth / 2, config.gameHeight / 2 - 90, 'gameOver')
    this.gameOver.anchor.setTo(0.5, 0.5)
    this.gameOver.scale.setTo(0.20, 0.20)
    this.gameOver.fixedToCamera = true

    // Create the 'Continue' buttton
    this.continueBtn = new Phaser.Button(this.game, config.gameWidth / 2, 620, 'continueBtn', function () {
      this.cache.addJSON('checkDeath', '', {justDied: true})
      // this.sounds.play('MainTheme', 0.5)
      this.state.start(this.saveState.levelName)
    }, this, 1, 0, 0)
    this.continueBtn.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this.continueBtn)
  }

  update () {
    // Reurn to the title screen
    if (this.playGame.justDown === true) {
      this.playGame.reset(true) // Resets the key
      this.cache.addJSON('checkDeath', '', {justDied: true})
      this.state.start(this.saveState.levelName)
    }
  }

  setupKeyboard () {
    this.playGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }
}

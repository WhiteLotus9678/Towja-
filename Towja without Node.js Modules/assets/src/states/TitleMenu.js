import Phaser from 'phaser'
import config from '../config'
import A from '../sprites/A'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
    this._timer = new Phaser.Time(this.game)
  }

  init () {
    this.isScrolling = false // need to reset to false
    this.fadeToBlack = false
  }

  preload () {
    this.sounds = this.game.add.audioSprite('sounds')
    this.game.world.setBounds(0, 0, this.game.width, this.game.height)
  }

  create () {
    this.setupKeyboard()

    this.sounds.play('TitleScreen', config.SFX_VOLUME)

    // Add the image for the title screen background
    this.title = this.game.add.sprite(config.gameWidth / 2, config.gameHeight + 430, 'TowerTitleScreen')
    this.title.anchor.setTo(0.5, 0.5)
    this.title.scale.setTo(0.67, 0.67)

    this.A = new A({
      game: this.game,
      x: config.gameWidth / 2 + 490,
      y: config.gameHeight / 2 - 130
    })
    this.A.scale.setTo(0.6, 0.6)
    this.game.add.existing(this.A)

    // Add the image for the title logo
    this.logo = this.game.add.image(config.gameWidth / 2 - 200, config.gameHeight / 2 - 130, 'Towj')
    this.logo.anchor.setTo(0.5, 0.5)
    this.logo.scale.setTo(0.25, 0.25)

    // Create the 'Start' buttton
    this.startBtn = new Phaser.Button(this.game, config.gameWidth / 2, 530, 'startBtn', function () {
      this.isScrolling = true
    }, this, 1, 0, 0)
    this.startBtn.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this.startBtn)

    // Create the 'Controls' buttton
    this.controlsBtn = new Phaser.Button(this.game, config.gameWidth / 2, 620, 'controlsBtn', function () {
      this.sounds.stop('TitleScreen')
      this.game.state.start('ControlsMenu')
    }, this, 1, 0, 0)
    this.controlsBtn.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this.controlsBtn)

    // Create the 'Credits' buttton
    this.creditsBtn = new Phaser.Button(this.game, config.gameWidth / 2, 710, 'creditsBtn', function () {
      this.sounds.stop('TitleScreen')
      this.game.state.start('CreditsMenu')
    }, this, 1, 0, 0)
    this.creditsBtn.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this.creditsBtn)

    // Load the sprite for the fadein
    this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare')
    this.blackSquare.scale.setTo(4, 4)
    this.blackSquare.alpha = 0
  }

  update () {
    // Load into a new state based on the button pressed
    if (this.playGame.justPressed()) {
      this.blackSquare.bringToTop()
    }
    if (this.isScrolling) {
      this.startBtn.visible = false
      this.controlsBtn.visible = false
      this.creditsBtn.visible = false
      this.title.y -= this._timer.physicsElapsed * (1000) * (this.title.y / 650)
    }
    if (this.title.y <= 40) {
      this.blackSquare.alpha = 1
      this.cache.addJSON('checkDeath', '', {justDied: false})
      this.sounds.stop('TitleScreen')
      this.sounds.play('MainTheme', 0.5)
      this.game.state.start('Start_Scene')
    }
    if (this.title.y <= 170) {
      this.fadeToBlack = true
    }
    if (this.fadeToBlack) {
      this.blackSquare.alpha += this._timer.physicsElapsed
    }
  }

  setupKeyboard () {
    this.playGame = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }
}

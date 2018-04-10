import Phaser from 'phaser'
import PopsDesk from '../sprites/Pops.js'
import NinjaIdle from '../sprites/NinjaIdle.js'
import config from '../config'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
  }

  create () {
    this.setUpKeyboard()

    this.background = this.game.add.sprite(0, config.gamewidth, 'StartBG')
    // this.background.anchor.setTo(1, 1)
    // this.background.scale.setTo(1, 1)

    // Load the sprite for the fadeout
    this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare')
    this.blackSquare.scale.setTo(4, 4)
    this.blackSquare.alpha = 0

    //  Create Pops
    this.popsDesk = new PopsDesk({
      game: this.game,
      x: 970.0,
      y: 470.0
    })
    this.game.add.existing(this.popsDesk)

    // Create the ninja
    this.ninjaIdle = new NinjaIdle({
      game: this.game,
      x: 594.0,
      y: 702
    })
    this.ninjaIdle.scale.setTo(0.75, 0.75)
    this.ninjaIdle.scale.x *= -1
    this.game.add.existing(this.ninjaIdle)

    //  Sets camera to follow player
    this.game.camera.follow(this.ninjaIdle, Phaser.Camera.FOLLOW_PLATFORMER)
    var w = this.game.camera.width / 8
    var h = this.game.camera.height / 3
    this.game.camera.deadzone = new Phaser.Rectangle((this.game.camera.width - w) / 2, (this.game.camera.height - h) / 2 + 1.5 * h * 0.25, w, h)

    // Add the Pops textboxes in order
    this.Pops1_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops1-7')
    this.Pops1_7.anchor.setTo(0.5, 0.5)
    this.Pops1_7.scale.setTo(0.7, 0.7)
    this.Pops1_7.alpha = 0
    this.Pops1_7.fixedToCamera = true

    this.Pops2_3 = this.game.add.sprite(this.game.width / 2, 630, 'Pops2-3')
    this.Pops2_3.anchor.setTo(0.5, 0.5)
    this.Pops2_3.scale.setTo(0.7, 0.7)
    this.Pops2_3.alpha = 0
    this.Pops2_3.fixedToCamera = true

    this.Pops3_4 = this.game.add.sprite(this.game.width / 2, 630, 'Pops3-4')
    this.Pops3_4.anchor.setTo(0.5, 0.5)
    this.Pops3_4.scale.setTo(0.7, 0.7)
    this.Pops3_4.alpha = 0
    this.Pops3_4.fixedToCamera = true

    this.Pops4_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops4-7')
    this.Pops4_7.anchor.setTo(0.5, 0.5)
    this.Pops4_7.scale.setTo(0.7, 0.7)
    this.Pops4_7.alpha = 0
    this.Pops4_7.fixedToCamera = true

    this.Pops4_12 = this.game.add.sprite(this.game.width / 2, 630, 'Pops4-12')
    this.Pops4_12.anchor.setTo(0.5, 0.5)
    this.Pops4_12.scale.setTo(0.7, 0.7)
    this.Pops4_12.alpha = 0
    this.Pops4_12.fixedToCamera = true

    this.Pops5_3 = this.game.add.sprite(this.game.width / 2, 630, 'Pops5-3')
    this.Pops5_3.anchor.setTo(0.5, 0.5)
    this.Pops5_3.scale.setTo(0.7, 0.7)
    this.Pops5_3.alpha = 0
    this.Pops5_3.fixedToCamera = true

    this.Pops6_7 = this.game.add.sprite(this.game.width / 2, 630, 'Pops6-7')
    this.Pops6_7.anchor.setTo(0.5, 0.5)
    this.Pops6_7.scale.setTo(0.7, 0.7)
    this.Pops6_7.alpha = 0
    this.Pops6_7.fixedToCamera = true

    this.Pops7_10 = this.game.add.sprite(this.game.width / 2, 630, 'Pops7-10')
    this.Pops7_10.anchor.setTo(0.5, 0.5)
    this.Pops7_10.scale.setTo(0.7, 0.7)
    this.Pops7_10.alpha = 0
    this.Pops7_10.fixedToCamera = true

    this.Pops8_12 = this.game.add.sprite(this.game.width / 2, 630, 'Pops8-12')
    this.Pops8_12.anchor.setTo(0.5, 0.5)
    this.Pops8_12.scale.setTo(0.7, 0.7)
    this.Pops8_12.alpha = 0
    this.Pops8_12.fixedToCamera = true

    this.Pops9_6 = this.game.add.sprite(this.game.width / 2, 630, 'Pops9-6')
    this.Pops9_6.anchor.setTo(0.5, 0.5)
    this.Pops9_6.scale.setTo(0.7, 0.7)
    this.Pops9_6.alpha = 0
    this.Pops9_6.fixedToCamera = true

    // Add the ninja's textbox
    this.ninjaTalk = this.game.add.sprite(this.game.width / 2, 630, 'NinjaTalk')
    this.ninjaTalk.anchor.setTo(0.5, 0.5)
    this.ninjaTalk.scale.setTo(0.7, 0.7)
    this.ninjaTalk.alpha = 0
    this.ninjaTalk.fixedToCamera = true

    // Counter to go through text
    this.counter = 0
    this.createText(this.counter)
  }

  update () {
    if (this.nextTextKey.justPressed()) {
      // TODO: Switch case that increments itself, make sure to ignore the key after it's pressed
      this.counter++
      this.createText(this.counter)
      this.nextTextKey.ignore = true
    }
    if (this.nextTextKey.justReleased()) {
      this.nextTextKey.ignore = false
    }
  }

  createText (counter) {
    switch (counter) {
      case 0:
        this.Pops1_7.alpha = 1
        break
      case 1:
        this.Pops1_7.alpha = 0
        this.ninjaTalk.alpha = 1
        break
      case 2:
        this.ninjaTalk.alpha = 0
        this.Pops2_3.alpha = 1
        break
      case 3:
        this.Pops2_3.alpha = 0
        this.ninjaTalk.alpha = 1
        break
      case 4:
        this.ninjaTalk.alpha = 0
        this.Pops3_4.alpha = 1
        break
      case 5:
        this.Pops3_4.alpha = 0
        this.ninjaTalk.alpha = 1
        break
      case 6:
        this.ninjaTalk.alpha = 0
        this.Pops4_7.alpha = 1
        break
      case 7:
        this.Pops4_7.alpha = 0
        this.Pops4_12.alpha = 1
        break
      case 8:
        this.Pops4_12.alpha = 0
        this.ninjaTalk.alpha = 1
        break
      case 9:
        this.ninjaTalk.alpha = 0
        this.Pops5_3.alpha = 1
        break
      case 10:
        this.Pops5_3.alpha = 0
        this.Pops6_7.alpha = 1
        break
      case 11:
        this.Pops6_7.alpha = 0
        this.ninjaTalk.alpha = 1
        break
      case 12:
        this.ninjaTalk.alpha = 0
        this.Pops7_10.alpha = 1
        break
      case 13:
        this.Pops7_10.alpha = 0
        this.Pops8_12.alpha = 1
        break
      case 14:
        this.Pops8_12.alpha = 0
        this.Pops9_6.alpha = 1
        break
      case 15:
        this.Pops9_6.alpha = 0
        this.game.state.start('Level_Start')
        break
    }
  }

  setUpKeyboard () {
    this.nextTextKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }
}

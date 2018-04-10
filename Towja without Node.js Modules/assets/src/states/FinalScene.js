import Phaser from 'phaser'
// TODO: POPS
import NinjaIdle from '../sprites/NinjaIdle.js'
import PopsBoss from '../sprites/PopsBoss'
import config from '../config'

export default class extends Phaser.State {
  constructor ({game}) {
    super(game)
    this.game = game
  }

  create () {
    this.setUpKeyboard()

    this.background = this.game.add.image(-1350, -2500, 'FinalBG')

    this.popsHead = new PopsBoss({
      game: this.game,
      x: 770,
      y: -330
    })
    this.popsHead.scale.setTo(10, 10)
    this.game.add.existing(this.popsHead)

    // Load the sprite for the fadeout
    this.blackSquare = this.game.add.sprite(0, 0, 'BlackSquare')
    this.blackSquare.scale.setTo(4, 4)
    this.blackSquare.alpha = 0

    // Create the ninja
    this.ninjaIdle = new NinjaIdle({
      game: this.game,
      x: 800.0,
      y: 650.0
    })
    this.ninjaIdle.scale.setTo(0.75, 0.75)
    this.ninjaIdle.scale.x *= -1
    this.game.add.existing(this.ninjaIdle)

    // Add the End textboxes in order
    this.End1_1 = this.game.add.sprite(this.game.width / 2, 630, 'End1-1')
    this.End1_1.anchor.setTo(0.5, 0.5)
    this.End1_1.scale.setTo(0.7, 0.7)
    this.End1_1.alpha = 0
    this.End1_1.fixedToCamera = true

    this.End1_2 = this.game.add.sprite(this.game.width / 2, 630, 'End1-2')
    this.End1_2.anchor.setTo(0.5, 0.5)
    this.End1_2.scale.setTo(0.7, 0.7)
    this.End1_2.alpha = 0
    this.End1_2.fixedToCamera = true

    this.End1_3 = this.game.add.sprite(this.game.width / 2, 630, 'End1-3')
    this.End1_3.anchor.setTo(0.5, 0.5)
    this.End1_3.scale.setTo(0.7, 0.7)
    this.End1_3.alpha = 0
    this.End1_3.fixedToCamera = true

    this.End1_4 = this.game.add.sprite(this.game.width / 2, 630, 'End1-4')
    this.End1_4.anchor.setTo(0.5, 0.5)
    this.End1_4.scale.setTo(0.7, 0.7)
    this.End1_4.alpha = 0
    this.End1_4.fixedToCamera = true

    this.End1_5 = this.game.add.sprite(this.game.width / 2, 630, 'End1-5')
    this.End1_5.anchor.setTo(0.5, 0.5)
    this.End1_5.scale.setTo(0.7, 0.7)
    this.End1_5.alpha = 0
    this.End1_5.fixedToCamera = true

    this.End1_6 = this.game.add.sprite(this.game.width / 2, 630, 'End1-6')
    this.End1_6.anchor.setTo(0.5, 0.5)
    this.End1_6.scale.setTo(0.7, 0.7)
    this.End1_6.alpha = 0
    this.End1_6.fixedToCamera = true

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
        this.End1_1.alpha = 1
        break
      case 1:
        this.End1_1.alpha = 0
        this.End1_2.alpha = 1
        break
      case 2:
        this.End1_2.alpha = 0
        this.End1_3.alpha = 1
        break
      case 3:
        this.End1_3.alpha = 0
        this.End1_4.alpha = 1
        break
      case 4:
        this.End1_4.alpha = 0
        this.End1_5.alpha = 1
        break
      case 5:
        this.End1_5.alpha = 0
        this.End1_6.alpha = 1
        break
      case 6:
        this.End1_6.alpha = 0
        this.game.state.start('Level_Final')
        break
    }
  }

  setUpKeyboard () {
    this.nextTextKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  }
}

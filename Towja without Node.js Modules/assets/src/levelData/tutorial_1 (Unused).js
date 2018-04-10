import Phaser from 'phaser'
import Level from '../states/Level.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('testMap2-data')
  }

  create () {
    super.create()

    // Set the player direction
    this.player.makeFaceRight()
  }

  setupKeyboard () {
    super.setupKeyboard()

    // Set the '1' key to load into the next level
    this.nextLevelKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE)
  }

  update () {
    super.update()

    if (this.nextLevelKey.justPressed()) {
      this.loadLevel('Level_1', 1629, 434.6)
    }
  }
}

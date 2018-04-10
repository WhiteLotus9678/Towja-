/* globals __DEV__ */

import Phaser from 'phaser'

export default class SaveScroll extends Phaser.Sprite {
  constructor ({game, pX, pY}) {
    // Initialize object basics
    console.log('Save pX: ' + pX + ', Save pY' + pY)
    super(game, pX, pY, 'savingScroll')
    this.game = game
    this._timer = new Phaser.Time(this.game)

    this.scale.setTo(0.4, 0.4)
    this.anchor.setTo(0.5, 0.5)
    this.active = true

    this.leftPoint = new Phaser.Point(this.x - 60, this.y + 30)
    this.centerPoint = new Phaser.Point(this.x, this.y + 30)
    this.rightPoint = new Phaser.Point(this.x + 60, this.y + 30)

    // Load the sprite for the saving object and the etxt that should show up for it
    this.saveText = this.game.add.sprite(this.game.width, this.game.height, 'savedTextbox')
    this.saveText.anchor.setTo(1, 1)
    this.saveText.alpha = 0
    this.show = false
    this.saveText.fixedToCamera = true
  }

  showText () {
    this.show = true
  }

  update () {
    if (this.show === true) {
      this.saveText.alpha = 2
      this.show = false
    } else if (this.show === false && this.saveText.alpha > 0) {
      this.saveText.alpha -= this._timer.physicsElapsed
      if (this.saveText.alpha < 0) {
        this.saveText.alpha = 0
      }
    }
    // console.log(this.saveText.alpha)
  }

  //  Checks whether the chest is overlapping with pSprite
  overlapWithObject (pSprite) {
    // Stops the function from executing if the player is attacking
    if (pSprite.meleeAttacking()) {
      return
    }

    if (pSprite === null || pSprite === undefined) {
      return false
    }
    if (!this.active) {
      return false
    }

    //  Check left side of the collision box
    let bodies = this.game.physics.p2.hitTest(this.leftPoint)
    //  console.info(bodies.length)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite === pSprite) {
        this.showText()
        return true
      }
    }

    //  Check center of the collision box
    bodies = this.game.physics.p2.hitTest(this.centerPoint)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite === pSprite) {
        this.showText()
        return true
      }
    }
    //  Check right side of the collision box
    bodies = this.game.physics.p2.hitTest(this.rightPoint)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite === pSprite) {
        this.showText()
        return true
      }
    }
  }
}

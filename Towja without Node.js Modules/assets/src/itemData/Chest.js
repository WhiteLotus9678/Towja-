import Phaser from 'phaser'

export default class Chest extends Phaser.Sprite {
  constructor ({ game, pX, pY, pItem, pPlayer }) {
    // Initialize object basics
    super(game, pX, pY, 'tChest', 0)
    this.game = game
    this.mItem = pItem
    this.scale.setTo(0.4, 0.4)
    this.active = true
    this.player = pPlayer
    this._timer = new Phaser.Time(this.game)

    this.anchor.setTo(0.5, 0.5)

    this.leftPoint = new Phaser.Point(this.x - 60, this.y + 30)
    this.centerPoint = new Phaser.Point(this.x, this.y + 30)
    this.rightPoint = new Phaser.Point(this.x + 60, this.y + 30)

    //  Set up animations
    this.animations.add('active', [0, 0, 0, 1, 2, 3, 4], 4, false)
    this.animations.add('inactive', [0], 1, false)
    this.animations.play('active', 20, true)

    // //  Enable Physics
    // this.game.physics.p2.enableBody(this, true)
    // //  Set Collider Dimensions
    // this.body.setRectangle(160, 60, -5, 20)
    // //  Sets the hitbox to a sensor
    // this.body.data.shapes[0].sensor = true

    this.show = false

    // Load the text for the sword
    this.swordText = this.game.add.sprite(this.game.width / 2, this.game.height * 0.75, 'swordText')
    this.swordText.anchor.setTo(0.5, 0.5)
    this.swordText.alpha = 0
    this.swordText.fixedToCamera = true

    // Load the text for the meteor chain
    this.chainText = this.game.add.sprite(this.game.width / 2, this.game.height * 0.75, 'chainText')
    this.chainText.anchor.setTo(0.5, 0.5)
    this.chainText.alpha = 0
    this.chainText.fixedToCamera = true

    // Load the text for the hammer
    this.hammerText = this.game.add.sprite(this.game.width / 2, this.game.height * 0.75, 'hammerText')
    this.hammerText.anchor.setTo(0.5, 0.5)
    this.hammerText.alpha = 0
    this.hammerText.fixedToCamera = true
  }

  // Return the item in the chest
  getItem () {
    console.info('Pickup called in chest')
    return this.mItem
  }

  showText () {
    this.show = true
  }

  update () {
    if (this.overlapWithObject(this.player) && this.active && !this.player.meleeAttacking()) {
      console.log('Adding weapon to inventory')
      console.log(this.player)
      console.log(this.mItem)
      this.player.addToInventory(this.mItem)
      this.deactivate()
    }

    // Show text for the Sword OR Meteor Chain OR Hammer
    if (this.show === true) {
      if (this.mItem.name === 'Sword') {
        this.swordText.alpha = 5
      } else if (this.mItem.name === 'Meteor Chain') {
        this.chainText.alpha = 8
      } else if (this.mItem.name === 'Hammer') {
        this.hammerText.alpha = 5
        this.hammerText.bringToTop()
      }
      this.show = false
    } else if (this.show === false && (this.swordText.alpha > 0 || this.chainText.alpha > 0 || this.hammerText.alpha > 0)) {
      if (this.mItem.name === 'Sword') {
        this.swordText.alpha -= this._timer.physicsElapsed
      } else if (this.mItem.name === 'Meteor Chain') {
        this.chainText.alpha -= this._timer.physicsElapsed
      } else if (this.mItem.name === 'Hammer') {
        this.hammerText.alpha -= this._timer.physicsElapsed
      }
      if (this.swordText.alpha < 0 || this.chainText.alpha < 0 || this.hammerText.alpha < 0) {
        if (this.mItem.name === 'Sword') {
          this.swordText.alpha = 0
        } else if (this.mItem.name === 'Meteor Chain') {
          this.chainText.alpha = 0
        } else if (this.mItem.name === 'Hammer') {
          this.hammerText.alpha = 0
        }
      }
    }
  }

  deactivate () {
    this.active = false
    this.animations.play('inactive')
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

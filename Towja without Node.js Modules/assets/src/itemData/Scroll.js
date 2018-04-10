import Phaser from 'phaser'

export default class Scroll extends Phaser.Sprite {
  constructor ({ game, pX, pY, pAbility, pPlayer }) {
    // Initialize object basics
    super(game, pX, pY, 'scroll', 0)
    this.game = game
    this.mAbility = pAbility
    this.player = pPlayer
    this.active = true

    this.scale.setTo(0.4, 0.4)
    this.anchor.setTo(0.5, 0.5)

    this.leftPoint = new Phaser.Point(this.x - 60, this.y + 30)
    this.centerPoint = new Phaser.Point(this.x, this.y + 30)
    this.rightPoint = new Phaser.Point(this.x + 60, this.y + 30)

    this._timer = new Phaser.Time(this.game)

    // Load the text for wall jump
    this.wallJumpText = this.game.add.sprite(this.game.width / 2, this.game.height * 0.75, 'wallJumpText')
    this.wallJumpText.anchor.setTo(0.5, 0.5)
    this.wallJumpText.alpha = 0
    this.wallJumpText.fixedToCamera = true
  }

  // Return the ability i nthe scroll
  getAbility () {
    console.info('Pickup called in scroll')
    return this.mAbility
  }

  showText () {
    this.show = true
  }

  update () {
    if (this.overlapWithObject(this.player) && this.active) {
      console.log('Adding an ability to inventory')
      console.log(this.player)
      console.log(this.mAbility)
      this.player.addToInventory(this.mAbility)
      this.deactivate()
    }

    // Show text for the Sword OR Meteor Chain
    if (this.show === true) {
      if (this.mAbility.name === 'Wall Jump') {
        this.wallJumpText.alpha = 5
      }
      this.show = false
    } else if (this.show === false && this.wallJumpText.alpha > 0) {
      this.wallJumpText.alpha -= this._timer.physicsElapsed
      if (this.wallJumpText.alpha < 0) {
        this.wallJumpText.alpha = 0
      }
    }
  }

  deactivate () {
    this.active = false
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

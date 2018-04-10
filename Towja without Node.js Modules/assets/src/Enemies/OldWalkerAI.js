import Phaser from 'phaser'

export default class WalkerAI extends Phaser.Sprite {
  constructor ({game, pX, pY, speed, spriteName, pPlayer}) {
    super(game, pX, pY, spriteName, 0)
    this.body = new Phaser.Physics.P2.Body(this.game, this, pX, pY)
    this.body.fixedRotation = true
    this.speed = speed

    this.dying = false

    this._timer = new Phaser.Time(this.game)
    this.body.debug = true
    this.body.mass = 5
    this.body.fixedRotation = true
    this.body.kinematic = true

    this.body.data.shapes[0].sensor = true

    this.player = pPlayer
    console.log(`AI Velocity.x: ${this.body.velocity.x}`)
    this.body.velocity.x = speed
    console.log(`AI Velocity.x: ${this.body.velocity.x}`)

    this.body.onBeginContact.add(this.checkPlayer, this)
  }

  setAnchor (pX, pY) {
    this.anchor.setTo(pX, pY)
  }

  checkPlayer (bodyA, bodyB, shapeA, shapeB, contactData) {
    console.log('Collision')
    if (this.dying) {
      return
    }
    if (bodyA === this.player.body) {
      if (this.player.meleeAttacking()) {
        this.death()
        return
      }

      console.log('Collision with player')
      if (this.player.takeDamage()) {
        this.player.setiFrames(1.0)
      }

      // Reverse Direction If Needed
      if (this.player.centerX > this.centerX) {
        this.body.velocity.x = -this.speed
      } else {
        this.body.velocity.x = this.speed
      }
    }
  }

  death () {
    this.body.velocity.x = 0
    this.dying = true
    this.events.onOutOfBounds.add(this.kill, this)
  }

  setPoints ({ leftX, leftY, rightX, rightY }) {
    this.leftPoint = new Phaser.Point(leftX, leftY)
    this.rightPoint = new Phaser.Point(rightX, rightY)
  }

  update () {
    this.scale.setTo(Math.sign(-Math.abs(this.scale.x) * this.body.velocity.x), this.scale.y)

    if (this.dying) {
      this.body.velocity.y += this._timer.physicsElapsed * 4000
      this.animations.play('dead')
      if (this.centerY >= 4000) {
        this.destroy()
      }
      return true
    }

    this.body.velocity.x = Math.sign(this.body.velocity.x) * this.speed

    this.leftPoint = new Phaser.Point(this.centerX - 45, this.y + 0)
    this.rightPoint = new Phaser.Point(this.centerX + 45, this.y + 0)
    this.leftFloorPoint = new Phaser.Point(this.centerX - 45, this.y + 40)
    this.rightFloorPoint = new Phaser.Point(this.centerX + 45, this.y + 40)

    let bodies
    let floorBodies
    //  moving left
    if (this.body.velocity.x > 0) {
      bodies = this.game.physics.p2.hitTest(this.rightPoint)
      floorBodies = this.game.physics.p2.hitTest(this.rightFloorPoint)
    } else {
      bodies = this.game.physics.p2.hitTest(this.leftPoint)
      floorBodies = this.game.physics.p2.hitTest(this.leftFloorPoint)
    }
    let flipped = false
    //  console.info(bodies.length)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite !== this.player) {
        this.body.velocity.x = -this.body.velocity.x
        flipped = true
      }
    }
    if (!flipped) {
      if (floorBodies.length === 0) {
        this.body.velocity.x = -this.body.velocity.x
        flipped = true
      }
    }
    //  Check for collision with player
    bodies = this.body.collidesWith
    // console.log(`Colliding with: ${bodies.length}`)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i] === this.player.body) {
        if (!this.player.checkInvulnerable()) {
          this.player.takeDamage()
        }
      }
    }
  }
}

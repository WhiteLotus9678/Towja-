import Phaser from 'phaser'
import EnemyBase from './EnemyBase.js'

export default class WalkerAI extends EnemyBase {
  constructor ({game, pX, pY, speed, spriteName, pPlayer, pointXSet, pointYSet}) {
    console.log(game)
    super({
      game: game,
      pX: pX,
      pY: pY,
      pSpeed: speed,
      spriteName,
      pPlayer})
    this.body.velocity.x = speed
    this.pointXSet = pointXSet
    this.pointYSet = pointYSet
  }

  setAnchor (pX, pY) {
    this.anchor.setTo(pX, pY)
  }

  damagePlayer () {
    super.damagePlayer()
    // Reverse Direction If Needed
    if (this.player.centerX > this.centerX) {
      this.body.velocity.x = -this.speed
    } else {
      this.body.velocity.x = this.speed
    }
  }

  setPoints ({ leftX, leftY, rightX, rightY }) {
    this.leftPoint = new Phaser.Point(leftX, leftY)
    this.rightPoint = new Phaser.Point(rightX, rightY)
  }

  hitsWall () {}

  update () {
    if (this.body.velocity.x !== 0) {
      this.scale.setTo(Math.sign(-Math.abs(this.scale.x) * this.body.velocity.x), this.scale.y)
    }

    if (this.dying) {
      this.body.velocity.y += this._timer.physicsElapsed * 4000
      this.animations.play('dead')
      if (this.centerY >= 4000) {
        this.destroy()
      }
      return true
    }

    this.body.velocity.x = Math.sign(this.body.velocity.x) * this.speed

    this.leftPoint = new Phaser.Point(this.centerX - this.pointXSet, this.y + 0)
    this.rightPoint = new Phaser.Point(this.centerX + this.pointXSet, this.y + 0)
    this.leftFloorPoint = new Phaser.Point(this.centerX - this.pointXSet, this.y + this.pointYSet)
    this.rightFloorPoint = new Phaser.Point(this.centerX + this.pointXSet, this.y + this.pointYSet)

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
        this.hitsWall()
      }
    }
    if (!flipped) {
      if (floorBodies.length === 0) {
        this.body.velocity.x = -this.body.velocity.x
        flipped = true
        this.hitsWall()
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

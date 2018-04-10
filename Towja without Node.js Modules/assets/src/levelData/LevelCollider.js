import Phaser from 'phaser'

export default class LevelCollider extends Phaser.Sprite {
  constructor ({game, pX, pY, nextLevel}) {
    // Initialize object basics
    super(game, pX, pY, '')
    this.game = game
    this.next = nextLevel
    this.scale.setTo(0.4, 0.4)
    this.active = true
  }

  // Return the next level associated with the level collider
  getLevel () {
    console.info('Hit level collider')
    return this.next
  }

  //  Checks whether the chest is overlapping with pSprite
  overlapWithObject (pSprite) {
    // Stops the function from executing if the player is attacking
    if (pSprite.meleeAttacking()) {
      return
    }

    if (pSprite === null || pSprite === undefined) {
      console.log('Null or Undefined')
      return false
    }
    if (!this.active) {
      console.log('Level collider isnt active')
      return false
    }

    //  Check left side of the collision box
    let bodies = this.game.physics.p2.hitTest(new Phaser.Point(this.x, this.y - 50))
    //  console.info(bodies.length)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite === pSprite) {
        this.animations.play('inactive')
        this.active = false
        return true
      }
    }

    bodies = this.game.physics.p2.hitTest(new Phaser.Point(this.x, this.y + 100))
    //  console.info(bodies.length)
    for (let i = 0; i < bodies.length; i++) {
      if (bodies[i].parent.sprite === pSprite) {
        this.animations.play('inactive')
        this.active = false
        return true
      }
    }
  }
}

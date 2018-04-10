import Phaser from 'phaser'

export default class EnemyBase extends Phaser.Sprite {
  constructor ({game, pX, pY, pSpeed, spriteName, pPlayer}) {
    super(game, pX, pY, spriteName, 0)
    // Animation setup will be handled in child objects
    this.speed = pSpeed
    this.player = pPlayer
    this.dying = false

    this.body = new Phaser.Physics.P2.Body(this.game, this, pX, pY)
    this._timer = new Phaser.Time(this.game)

    this.body.onBeginContact.add(this.checkPlayer, this)
  }

  // Check for collision with the player
  checkPlayer (bodyA, bodyB, shapeA, shapeB, contactData) {
    // Don't check for damage if this enemy is dying
    if (this.dying) {
      return
    }

    // If the player is attacking, we check the player's hitbox AND the weapon hitbox
    if (this.player.meleeAttacking()) {
      if (bodyA === this.player.body) {
        // Kill the enemy
        this.death()
      }
    // If the player isn't attacking, only check the player's hitbox
    } else if (bodyA === this.player.body) {
      // Damage the player and give the player 1 second of iFrames
      this.damagePlayer()
    }
  }

  // Called when this enemy is killed
  death () {
    this.body.velocity.x = 0
    this.dying = true
    this.events.onOutOfBounds.add(this.kill, this)
    this.game.camera.shake(0.005, 100)
  }

  // Called whenever this enemy damages the player
  damagePlayer () {
    this.player.takeDamage()
    this.player.setiFrames(1.0)
  }

  update () {
    // If this enemy is dying
    if (this.dying) {
      this.body.velocity.y += this._timer.physicsElapsed * 4000
      this.animations.play('dead')
      if (this.centerY >= 4000) {
        this.destroy()
      }
      return true
    }
  }
}

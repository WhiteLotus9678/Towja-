/* globals __DEV__ */
import Phaser from 'phaser'
import { sequentialNumArray } from '../utils.js'

export default class PopsHands extends Phaser.Sprite {
  constructor ({ game, x, y, pPopsHead }) {
    super(game, x, y, 'pops-hands', 0)
    this.BossHead = pPopsHead
    this.incorporeal = false
    // this.animations.play('idle')

    this.anchor.setTo(0.5, 0.5)
    this.animations.add('Idle', [0], 10, true)
    this.animations.add('SummonMonsters', [3, 4, 4, 4, 5, 5, 5, 4, 4, 6, 7], 10, false)
    this.animations.add('PostSummon', [7], 10, true)
    this.animations.add('SlamAttack', [18, 18, 19, 19, 20, 21, 22, 21, 19, 23], 10, false)

    this.animations.getAnimation('SummonMonsters').onComplete.add(() => {
      this.animations.play('PostSummon')
      this.BossHead.setHandColliders()
    }, this)

    this.animations.getAnimation('SlamAttack').onComplete.add(() => {
      this.animations.play('Idle')
      this.BossHead.summoning = false
      this.BossHead.spawnWave()
    }, this)
  }

  takeDamage () {
    // Tell the head to process the damage
    this.BossHead.startTakingDamage()
    // Become incorporeal to prevent the player from dealing all 5 damage in a single hit
    // Also prevents player from taking damage immediately after a successful attack
    this.incorporeal = true
  }

  // Check for collision with the player
  checkPlayer (bodyA, bodyB, shapeA, shapeB, contactData) {
    // check whether BossHands can interact with player
    if (this.incorporeal) {
      return
    }

    // If the player is attacking, we check the player's hitbox AND the weapon hitbox
    if (this.player.meleeAttacking()) {
      if (bodyA === this.player.body) {
        // Take Damage
        this.takeDamage()
      }
    // If the player isn't attacking, only check the player's hitbox
    } else if (bodyA === this.player.body) {
      // Damage the player and give the player 1 second of iFrames
      this.damagePlayer()
    }
  }
}

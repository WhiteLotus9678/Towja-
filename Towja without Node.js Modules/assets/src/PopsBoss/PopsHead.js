/* globals __DEV__ */

import Phaser from 'phaser'
import PopsConfig from '../PopsConfig'
import PopsHands from './PopsHands.js'
import { sequentialNumArray } from '../utils.js'
import SmallDemon from '../Enemies/smallDemon.js'
import FlyingDemon from '../Enemies/FlyingDemon.js'
import BigDemon from '../Enemies/BigDemon.js'
import DyingPops from './DyingPops.js'

export default class PopsHead extends Phaser.Sprite {
  constructor ({ game, x, y, pPlayer, background }) {
    console.log('X: ' + x + ' Y: ' + y)
    super(game, x, y, 'pops-head', 0)
    this.damageTimer = 0.0
    this._timer = new Phaser.Time(this.game)
    this.health = 5
    this.player = pPlayer
    this.background = background

    this.nextAttack = 0
    this.curWave = 1

    this.nextAttackTimer = 4.0

    this.anchor.setTo(0.5, 0.5)
    this.body = new Phaser.Physics.P2.Body(this.game, this, this.x, this.y)

    this.body.debug = __DEV__
    this.body.fixedRotation = true

    this.summoning = false
    // Remove the default shape
    this.body.clearShapes()
    // this.body.shape.sensor = true

    // The Physics sensors that represent Pops' hands
    // this.leftHandSensor = this.body.addRectangle(200, 240, -550, 230)
    // this.leftHandSensor.sensor = true
    //
    // this.rightHandSensor = this.body.addRectangle(200, 240, 550, 230)
    // this.rightHandSensor.sensor = true

    this.enemy1Dead = true
    this.enemy2Dead = true
    this.enemy3Dead = true
    this.enemy4Dead = true
    this.enemy5Dead = true
    this.enemy6Dead = true
    this.enemy7Dead = true
    this.enemy8Dead = true
    this.enemy9Dead = true
    this.enemy10Dead = true
    this.enemy11Dead = true
    this.enemy12Dead = true
    this.enemy13Dead = true

    // console.log(this.body)

    this.canBeHurt = false
    this.AttackState = 'NONE'

    this.BossHands = new PopsHands({
      game: game,
      x: x,
      y: y + 600,
      pPopsHead: this
    })

    // Need to shrink BossHands
    this.game.add.existing(this.BossHands)
    this.BossHands.scale.setTo(8.4, 8.4)

    // Add animations for head
    this.animations.add('Healthy_Idle', [16, 17, 18, 19, 20, 21, 20, 19, 18, 17], 10, true)
    this.animations.add('Healthy_Summon', sequentialNumArray(8, 14), 10, false)
    this.animations.add('Healthy_Slam_Warning', [0, 1, 2, 3, 3, 3], 7, false)
    this.animations.add('Healthy_Slam_Attack', [3, 3, 3], 7, false)
    // this.animations.play('Healthy_Idle')
    // this.setHandColliders()

    this.animations.getAnimation('Healthy_Summon').onComplete.add(() => {
      this.animations.play('Healthy_Idle')
    }, this)

    this.animations.getAnimation('Healthy_Slam_Warning').onComplete.add(() => {
      this.animations.play('Healthy_Slam_Attack')
      this.BossHands.animations.play('SlamAttack')
    }, this)

    this.animations.getAnimation('Healthy_Slam_Attack').onComplete.add(() => {
      if (this.summoning) {
        this.animations.play('Healthy_Slam_Attack')
      } else {
        this.animations.play('Healthy_Idle')
      }
    }, this)

    this.animations.play('Healthy_Idle')
    // Healthy, Hurt, and Dying
    // Taking Damage Head animation
  }

  endTakingDamage () {
    // Set Pops head to the appropriate head animation for this state
    this.nextAttackTimer = 4.0
  }
  startTakingDamage () {
    this.damageTimer = PopsConfig.DAMAGE_TIMER
    this.health--
    // Set head animation to the taking damage head animation
  }

  endAttack () {
    this.AttackState = 'NONE'
    this.body.removeShape(this.leftHandSensor)
    this.body.removeShape(this.rightHandSensor)
  }

  beginAttack () {
    if (this.curWave === 6) {
      this.death()
      return
    }

    switch (this.AttackState) {
      case 'SUMMON_MONSTERS':
        this.summonMonsters()
        this.BossHands.animations.play('SummonMonsters')
        break
      case 'SLAM':
        this.slam()
        break
      default:
        console.error('Pops used an unrecognized attack: ' + this.AttackState)
        break
    }
  }

  death () {
    this.game.camera.shake(0.015, 3000)

    console.log('Game:')
    console.log(this.game)
    this.DyingPops = new DyingPops({
      game: this.game,
      x: this.x,
      y: this.y + 100
    })
    this.DyingPops.scale.setTo(2, 2)

    this.game.add.existing(this.DyingPops)

    this.DyingPops.sendToBack()
    this.background.sendToBack()
    this.player.dontDieOnDab = true
    this.player.ContinueDab = true
    this.BossHands.destroy()
    this.destroy()
  }

  // ATTACK FUNCTIONS
  summonMonsters () {
    this.AttackState = 'SUMMON_MONSTERS'
    this.animations.play('Healthy_Summon')
  }

  slam () {
    this.player.setiFrames(2.0)
    this.summoning = true
    this.AttackState = 'SLAM'
    this.animations.play('Healthy_Slam_Attack')
    this.BossHands.animations.play('SlamAttack')
  }

  setHandColliders () {
    this.body.clearShapes()
    switch (this.AttackState) {
      case 'SUMMON_MONSTERS':

        this.body.kinematic = true
        this.leftHandSensor = this.body.addRectangle(200, 700, -1400, 300)
        this.rightHandSensor = this.body.addRectangle(200, 700, 1400, 300)

        break
      case 'SLAM':
        this.slam()
        break
      default:
        console.error('Pops used an unrecognized attack: ' + this.AttackState)
        break
    }
  }

  spawnWave () {
    console.log('Spawning wave ' + this.curWave)

    if (this.curWave === 1) {
      this.spawnWave1()
    } else if (this.curWave === 2) {
      this.spawnWave2()
    } else if (this.curWave === 3) {
      this.spawnWave3()
    } else if (this.curWave === 4) {
      this.spawnWave4()
    } else if (this.curWave === 5) {
      this.spawnWave5()
    }

    this.curWave++
  }

  allEnemiesKilled () {
    if (this.enemy1Dead && this.enemy2Dead && this.enemy3Dead && this.enemy4Dead && this.enemy5Dead && this.enemy6Dead && this.enemy7Dead && this.enemy8Dead && this.enemy9Dead &&
      this.enemy10Dead && this.enemy11Dead && this.enemy12Dead && this.enemy13Dead) {
      return true
    }
  }

  spawnWave1 () {
    this.enemy1 = new SmallDemon({
      game: this.game,
      pX: 1720,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy1)

    this.enemy1Dead = false

    this.enemy2 = new SmallDemon({
      game: this.game,
      pX: 1680,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy2)

    this.enemy2Dead = false

    this.enemy3 = new SmallDemon({
      game: this.game,
      pX: 1760,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy3)

    this.enemy3Dead = false

    this.enemy4 = new SmallDemon({
      game: this.game,
      pX: 2220,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy4)

    this.enemy4Dead = false

    this.enemy5 = new SmallDemon({
      game: this.game,
      pX: 2440,
      pY: 2765,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy5)

    this.enemy5Dead = false

    this.enemy6 = new SmallDemon({
      game: this.game,
      pX: 2060,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy6)

    this.enemy6Dead = false
  }

  spawnWave2 () {
    this.enemy1 = new FlyingDemon({
      game: this.game,
      pX: 1720,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy1)

    this.enemy1Dead = false

    this.enemy2 = new SmallDemon({
      game: this.game,
      pX: 1680,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy2)

    this.enemy2Dead = false

    this.enemy3 = new SmallDemon({
      game: this.game,
      pX: 1760,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy3)

    this.enemy3Dead = false

    this.enemy4 = new SmallDemon({
      game: this.game,
      pX: 2220,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy4)

    this.enemy4Dead = false

    this.enemy5 = new SmallDemon({
      game: this.game,
      pX: 2440,
      pY: 2765,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy5)

    this.enemy5Dead = false

    this.enemy6 = new SmallDemon({
      game: this.game,
      pX: 2060,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy6)

    this.enemy6Dead = false

    this.enemy7 = new FlyingDemon({
      game: this.game,
      pX: 1920,
      pY: 2400,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy7)

    this.enemy7Dead = false

    this.enemy8 = new FlyingDemon({
      game: this.game,
      pX: 2190,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy8)

    this.enemy8Dead = false
  }

  spawnWave4 () {
    this.enemy1 = new FlyingDemon({
      game: this.game,
      pX: 1720,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy1)

    this.enemy1Dead = false

    this.enemy2 = new SmallDemon({
      game: this.game,
      pX: 1400,
      pY: 2670,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy2)

    this.enemy2Dead = false

    this.enemy4 = new SmallDemon({
      game: this.game,
      pX: 2220,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy4)

    this.enemy4Dead = false

    this.enemy5 = new SmallDemon({
      game: this.game,
      pX: 2440,
      pY: 2765,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy5)

    this.enemy5Dead = false

    this.enemy6 = new SmallDemon({
      game: this.game,
      pX: 2060,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy6)

    this.enemy6Dead = false

    this.enemy7 = new FlyingDemon({
      game: this.game,
      pX: 1920,
      pY: 2400,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy7)

    this.enemy7Dead = false

    this.enemy8 = new FlyingDemon({
      game: this.game,
      pX: 2190,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy8)

    this.enemy8Dead = false

    this.enemy9 = new SmallDemon({
      game: this.game,
      pX: 1680,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy9)

    this.enemy9Dead = false

    this.enemy10 = new SmallDemon({
      game: this.game,
      pX: 1760,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy10)

    this.enemy10Dead = false
  }

  spawnWave3 () {
    this.enemy1 = new FlyingDemon({
      game: this.game,
      pX: 1720,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy1)

    this.enemy1Dead = false

    this.enemy2 = new FlyingDemon({
      game: this.game,
      pX: 1620,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2700,
      pHeightMin: 2550
    })
    this.game.add.existing(this.enemy2)

    this.enemy2Dead = false

    this.enemy3 = new FlyingDemon({
      game: this.game,
      pX: 1820,
      pY: 2650,
      pPlayer: this.player,
      pHeightMax: 2800,
      pHeightMin: 2650
    })
    this.game.add.existing(this.enemy3)

    this.enemy3Dead = false

    this.enemy4 = new FlyingDemon({
      game: this.game,
      pX: 2020,
      pY: 2800,
      pPlayer: this.player,
      pHeightMax: 2800,
      pHeightMin: 2650
    })
    this.game.add.existing(this.enemy4)

    this.enemy4Dead = false

    this.enemy5 = new FlyingDemon({
      game: this.game,
      pX: 2220,
      pY: 2650,
      pPlayer: this.player,
      pHeightMax: 2800,
      pHeightMin: 2650
    })
    this.game.add.existing(this.enemy5)

    this.enemy5Dead = false

    this.enemy6 = new FlyingDemon({
      game: this.game,
      pX: 2420,
      pY: 2700,
      pPlayer: this.player,
      pHeightMax: 2700,
      pHeightMin: 2550
    })
    this.game.add.existing(this.enemy6)

    this.enemy6Dead = false

    this.enemy7 = new FlyingDemon({
      game: this.game,
      pX: 1920,
      pY: 2400,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy7)

    this.enemy7Dead = false

    this.enemy8 = new FlyingDemon({
      game: this.game,
      pX: 2120,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy8)

    this.enemy8Dead = false

    this.enemy9 = new FlyingDemon({
      game: this.game,
      pX: 1420,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy9)

    this.enemy9Dead = false

    this.enemy10 = new FlyingDemon({
      game: this.game,
      pX: 2620,
      pY: 2500,
      pPlayer: this.player,
      pHeightMax: 2650,
      pHeightMin: 2550
    })
    this.game.add.existing(this.enemy10)

    this.enemy10Dead = false
  }

  spawnWave5 () {
    this.enemy1 = new FlyingDemon({
      game: this.game,
      pX: 1720,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy1)

    this.enemy1Dead = false

    this.enemy2 = new SmallDemon({
      game: this.game,
      pX: 1680,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy2)

    this.enemy2Dead = false

    this.enemy3 = new SmallDemon({
      game: this.game,
      pX: 1760,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy3)

    this.enemy3Dead = false

    this.enemy4 = new SmallDemon({
      game: this.game,
      pX: 2220,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy4)

    this.enemy4Dead = false

    this.enemy5 = new SmallDemon({
      game: this.game,
      pX: 2440,
      pY: 2765,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy5)

    this.enemy5Dead = false

    this.enemy6 = new FlyingDemon({
      game: this.game,
      pX: 2420,
      pY: 2700,
      pPlayer: this.player,
      pHeightMax: 2700,
      pHeightMin: 2550
    })
    this.game.add.existing(this.enemy6)

    this.enemy6Dead = false

    this.enemy7 = new FlyingDemon({
      game: this.game,
      pX: 1920,
      pY: 2400,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy7)

    this.enemy7Dead = false

    this.enemy8 = new FlyingDemon({
      game: this.game,
      pX: 2120,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy8)

    this.enemy8Dead = false

    this.enemy9 = new FlyingDemon({
      game: this.game,
      pX: 1420,
      pY: 2550,
      pPlayer: this.player,
      pHeightMax: 2550,
      pHeightMin: 2400
    })
    this.game.add.existing(this.enemy9)

    this.enemy9Dead = false

    this.enemy10 = new FlyingDemon({
      game: this.game,
      pX: 2620,
      pY: 2500,
      pPlayer: this.player,
      pHeightMax: 2650,
      pHeightMin: 2550
    })
    this.game.add.existing(this.enemy10)

    this.enemy10Dead = false

    this.enemy11 = new SmallDemon({
      game: this.game,
      pX: 1720,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy11)

    this.enemy11Dead = false

    this.enemy12 = new SmallDemon({
      game: this.game,
      pX: 2060,
      pY: 2845,
      pPlayer: this.player
    })
    this.game.add.existing(this.enemy6)
    this.enemy12Dead = false
  }

  update () {
    if (this.enemy1 && this.enemy1.dying) {
      this.enemy1Dead = true
    }
    if (this.enemy2 && this.enemy2.dying) {
      this.enemy2Dead = true
    }
    if (this.enemy3 && this.enemy3.dying) {
      this.enemy3Dead = true
    }
    if (this.enemy4 && this.enemy4.dying) {
      this.enemy4Dead = true
    }
    if (this.enemy5 && this.enemy5.dying) {
      this.enemy5Dead = true
    }
    if (this.enemy6 && this.enemy6.dying) {
      this.enemy6Dead = true
    }
    if (this.enemy7 && this.enemy7.dying) {
      this.enemy7Dead = true
    }
    if (this.enemy8 && this.enemy8.dying) {
      this.enemy8Dead = true
    }
    if (this.enemy9 && this.enemy9.dying) {
      this.enemy9Dead = true
    }
    if (this.enemy10 && this.enemy10.dying) {
      this.enemy10Dead = true
    }
    // console.log(this.enemy1Dead)

    if (this.allEnemiesKilled() && !this.summoning) {
      this.AttackState = 'SLAM'
      this.beginAttack()
    }

    if (this.player.dabbing) {
      this.health = 0
      this.death()
    }
  }
}

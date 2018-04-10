/* globals __DEV__ */

import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import Chest from '../itemData/Chest.js'
import Sword from '../itemData/Sword.js'
import Kunai from '../itemData/Kunai.js'
import MeteorHammer from '../itemData/MeteorChain.js'
import MaskedTurtle from '../Enemies/MaskedTurtle.js'
import SmallDemon from '../Enemies/smallDemon.js'
import PopsHead from '../PopsBoss/PopsHead'
import FlyingDemon from '../Enemies/FlyingDemon.js'
import BigDemon from '../Enemies/BigDemon.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('testMap-data', 1683.6, 637.7)
  }

  create () {
    super.create()

    this.startHere = this.cache.getJSON('start')

    // this.sounds.stop('naruto-stage')
    // this.sounds.play('naruto-stage')

    if (this.startHere !== null && this.startHere !== undefined) {
    }

    // Set player direction
    this.player.makeFaceLeft()

    // Tutorial messages
    this.tutorial_1 = this.game.add.image(1250, 500, 'arrow_keys')
    this.tutorial_2 = this.game.add.image(2000, 500, 'press_P')
    this.tutorial_3 = this.game.add.image(800, 600, 'press_Spacebar')
    this.tutorial_4 = this.game.add.image(300, 400, 'press_E')

    this.testChestClosed = true
    this.swordChestClosed = true
    this.bloodSwordChestClosed = true

    this.leftLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: this.game.height,
      nextLevel: 'Tutorial_1'
    })
    this.game.add.existing(this.leftLevelColliderBot)

    this.leftLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: this.game.height + 100,
      nextLevel: 'Intro_1'
    })
    this.game.add.existing(this.leftLevelColliderTop)

    this.FlyingDemonGuy = new FlyingDemon({
      game: this.game,
      pX: this.world.centerX,
      pY: this.world.centerY,
      pPlayer: this.player,
      pHeightMin: this.world.centerY - 200,
      pHeightMax: this.world.centerY + 20
    })

    this.game.add.existing(this.FlyingDemonGuy)

    this.world.sendToBack(this.background)
    this.world.bringToTop(this.player)
  }

  render () {
    super.render()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_Final', 'left', 2156.3, 3156.7)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_Start', 'left', 594.0, 702.3)
      }
    }

    //  Check for overlap with leftLevelColliderBot
    if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the second test level')
      this.loadLevel(this.leftLevelColliderBot.getLevel(), 147.5, 1256.7)
    }

    //  Check for overlap with leftLevelColliderTop
    if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the first intro level')
      this.loadLevel(this.leftLevelColliderTop.getLevel(), 1629, 434.6)
    }
  }
}

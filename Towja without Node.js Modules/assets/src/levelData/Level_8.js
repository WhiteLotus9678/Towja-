/* globals __DEV__ */

import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import Chest from '../itemData/Chest.js'
import MeteorChain from '../itemData/MeteorChain.js'
import SmallDemon from '../Enemies/smallDemon.js'
import BigDemon from '../Enemies/BigDemon.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level8-data')
  }

  create () {
    super.create()

    this.leftLevelCollider = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 230.1,
      nextLevel: 'Level_7'
    })
    this.game.add.existing(this.leftLevelCollider)

    this.meteorChainChest = new Chest({
      game: this.game,
      pX: 2860.7,
      pY: 750.0,
      pItem: new MeteorChain(),
      pPlayer: this.player
    })
    this.game.add.existing(this.meteorChainChest)

    // Deactivate the chest after the player receives the item
    if (this.player.Inventory.hasMeteorChain) {
      this.meteorChainChest.deactivate()
    }

    this.BigDemonBoi = new BigDemon({
      game: this.game,
      pX: 2000,
      pY: 565,
      pPlayer: this.player
    })
    this.game.add.existing(this.BigDemonBoi)

    this.smallDemon_0 = new SmallDemon({
      game: this.game,
      pX: 1000,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_0)

    this.smallDemon_1 = new SmallDemon({
      game: this.game,
      pX: 1100,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_1)

    this.smallDemon_2 = new SmallDemon({
      game: this.game,
      pX: 1200,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_2)

    this.smallDemon_3 = new SmallDemon({
      game: this.game,
      pX: 1300,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_3)

    this.smallDemon_4 = new SmallDemon({
      game: this.game,
      pX: 1400,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_4)

    this.smallDemon_6 = new SmallDemon({
      game: this.game,
      pX: 500,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_6)

    this.smallDemon_7 = new SmallDemon({
      game: this.game,
      pX: 600,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_7)

    this.smallDemon_8 = new SmallDemon({
      game: this.game,
      pX: 700,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_8)

    this.smallDemon_9 = new SmallDemon({
      game: this.game,
      pX: 800,
      pY: 770,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_9)

    this.player.bringToTop()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_7', 'left', 539, 1997.8)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_9', 'left', 815.6, 864.8)
      }
    }

    //  Check for overlap with leftLevelCollider
    if (this.player.isDead !== true && this.leftLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the seventh level')
      this.loadLevel(this.leftLevelCollider.getLevel(), 'left', 2810.7, 1064.7)
    }
  }
}

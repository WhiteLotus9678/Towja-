/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import SmallDemon from '../Enemies/smallDemon.js'
import BigDemon from '../Enemies/BigDemon.js'
import FlyingDemon from '../Enemies/FlyingDemon.js'
import Chest from '../itemData/Chest.js'
import Hammer from '../itemData/Hammer.js'
import SaveScroll from '../objects/SaveScroll.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level4-data')
    this.name = 'Level_4'
  }

  create () {
    super.create()

    this.leftLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 206.1,
      nextLevel: 'Level_9'
    })
    this.game.add.existing(this.leftLevelColliderTop)

    this.leftLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 1241.8,
      nextLevel: 'Level_6'
    })
    this.game.add.existing(this.leftLevelColliderBot)

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: 2975.1 + 25,
      pY: 297.1,
      nextLevel: 'Level_7'
    })
    this.game.add.existing(this.rightLevelCollider)

    this.smallDemon_2 = new SmallDemon({
      game: this.game,
      pX: this.world.centerX - 950,
      pY: this.world.centerY - 640,
      pPlayer: this.player
    })

    this.game.add.existing(this.smallDemon_2)

    this.bigDemon_0 = new BigDemon({
      game: this.game,
      pX: 700,
      pY: 740,
      pPlayer: this.player
    })

    this.game.add.existing(this.bigDemon_0)

    this.smallDemon_1 = new SmallDemon({
      game: this.game,
      pX: this.world.centerX - 850,
      pY: this.world.centerY - 640,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_1)

    this.smallDemon_4 = new SmallDemon({
      game: this.game,
      pX: this.world.centerX - 950,
      pY: this.world.centerY - 640,
      pPlayer: this.player
    })

    this.game.add.existing(this.smallDemon_4)

    this.smallDemon_5 = new SmallDemon({
      game: this.game,
      pX: 1900,
      pY: 1900,
      pPlayer: this.player
    })

    this.game.add.existing(this.smallDemon_5)

    this.smallDemon_6 = new SmallDemon({
      game: this.game,
      pX: 2000,
      pY: 1900,
      pPlayer: this.player
    })

    this.game.add.existing(this.smallDemon_6)

    this.smallDemon_7 = new SmallDemon({
      game: this.game,
      pX: 2100,
      pY: 1900,
      pPlayer: this.player
    })

    this.game.add.existing(this.smallDemon_7)

    this.hammerChest = new Chest({
      game: this.game,
      pX: 1530.0,
      pY: 1715.4,
      pItem: new Hammer(),
      pPlayer: this.player
    })
    this.game.add.existing(this.hammerChest)

    // Deactivate the chest after the player receives the item
    if (this.player.Inventory.hasHammer) {
      this.hammerChest.deactivate()
    }

    this.save = new SaveScroll({
      game: this.game,
      pX: 483.2,
      pY: 337.8
    })
    this.game.add.existing(this.save)

    // Makes sure the player passes on top of the saving scroll layer
    this.player.bringToTop()
  }
  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_3', 'left', 177.8, 730)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_5', 'left', 189.4, 441.0)
      }
    }

    //  Check for overlap with leftLevelColliderTop
    if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the ninth level')
      this.loadLevel(this.leftLevelColliderTop.getLevel(), 'right', 1752.2, 4973.4)
    }

    //  Check for overlap with leftLevelColliderBot
    if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the sixth level')
      this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 2856.1, 532.2)
    }
    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the fifth level')
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 102.9, 532.8)
    }

    // Save the game
    if (this.player.isDead !== true && this.save.overlapWithObject(this.player)) {
      console.info('Saving the game...')
      this.saveLevel(this.name, this.scale.x, this.player.x, this.player.y)
    }
  }
}

/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import SmallDemon from '../Enemies/smallDemon.js'
import FlyingDemon from '../Enemies/FlyingDemon.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level2-data')
  }

  create () {
    super.create()

    this.leftLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 1320.1,
      nextLevel: 'Level_3'
    })
    this.game.add.existing(this.leftLevelColliderBot)

    this.leftLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 460.0,
      nextLevel: 'Level_1'
    })
    this.game.add.existing(this.leftLevelColliderTop)

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: this.game.width + 400,
      pY: 412.3,
      nextLevel: 'Level_5'
    })
    this.game.add.existing(this.rightLevelCollider)

    // Place the monsters
    this.smallDemon_0 = new SmallDemon({
      game: this.game,
      pX: this.world.centerX - 260,
      pY: this.world.centerY + 375,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_0)

    this.smallDemon_1 = new SmallDemon({
      game: this.game,
      pX: this.world.centerX - 260,
      pY: this.world.centerY + 1050,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_1)

    this.FlyingDemon_0 = new FlyingDemon({
      game: this.game,
      pX: this.world.centerX + 450,
      pY: this.world.centerY - 1300,
      pPlayer: this.player,
      pHeightMin: this.world.centerY - 1300,
      pHeightMax: this.world.centerY - 1000
    })

    this.game.add.existing(this.FlyingDemon_0)

    this.FlyingDemon_1 = new FlyingDemon({
      game: this.game,
      pX: this.world.centerX + 550,
      pY: this.world.centerY - 1000,
      pPlayer: this.player,
      pHeightMin: this.world.centerY - 1300,
      pHeightMax: this.world.centerY - 1000
    })

    this.game.add.existing(this.FlyingDemon_1)

    this.FlyingDemon_2 = new FlyingDemon({
      game: this.game,
      pX: this.world.centerX + 650,
      pY: this.world.centerY - 1300,
      pPlayer: this.player,
      pHeightMin: this.world.centerY - 1300,
      pHeightMax: this.world.centerY - 1000
    })

    this.game.add.existing(this.FlyingDemon_2)

    this.FlyingDemon_3 = new FlyingDemon({
      game: this.game,
      pX: this.world.centerX + 750,
      pY: this.world.centerY - 1000,
      pPlayer: this.player,
      pHeightMin: this.world.centerY - 1300,
      pHeightMax: this.world.centerY - 1000
    })

    this.game.add.existing(this.FlyingDemon_3)
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_1', 'left', 1629, 434.6)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_3', 'left', 177.8, 730)
      }
    }

    //  Check for overlap with leftLevelColliderBot
    if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the third level')
      this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1587.3, 420.2)
    }
    //  Check for overlap with leftLevelColliderTop
    if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the first level')
      this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 1629, 434.7)
    }
    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the fourth level')
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 207.7, 1931.7)
    }
  }
}

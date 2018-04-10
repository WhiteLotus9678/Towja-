/* globals __DEV__ */
import Level from '../states/Level.js'
import SmallDemon from '../Enemies/smallDemon.js'
import LevelCollider from '../levelData/LevelCollider.js'
import BigDemon from '../Enemies/BigDemon.js'
import SaveScroll from '../objects/SaveScroll.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level5-data')
    this.name = 'Level_5'
  }

  create () {
    super.create()

    this.leftLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 1630.7,
      nextLevel: 'Level_2'
    })
    this.game.add.existing(this.leftLevelColliderBot)

    this.leftLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 138.6,
      nextLevel: 'Level_6'
    })
    this.game.add.existing(this.leftLevelColliderTop)

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: 2975.1 + 25,
      pY: 1642.5,
      nextLevel: 'Level_7'
    })
    this.game.add.existing(this.rightLevelCollider)

    // Place the monsters
    this.smallDemon_0 = new SmallDemon({
      game: this.game,
      pX: 500,
      pY: 1100,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_0)

    this.smallDemon_1 = new SmallDemon({
      game: this.game,
      pX: 600,
      pY: 1100,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_1)

    this.smallDemon_2 = new SmallDemon({
      game: this.game,
      pX: 700,
      pY: 1100,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_2)

    this.smallDemon_3 = new SmallDemon({
      game: this.game,
      pX: 900,
      pY: 1100,
      pPlayer: this.player
    })
    this.game.add.existing(this.smallDemon_3)

    this.BigDemonBoi = new BigDemon({
      game: this.game,
      pX: 700,
      pY: 1716,
      pPlayer: this.player
    })
    this.game.add.existing(this.BigDemonBoi)

    this.save = new SaveScroll({
      game: this.game,
      pX: 1648.9,
      pY: 1236.4
    })
    this.game.add.existing(this.save)

    // Makes sure the player passes on top of the saving scroll layer
    this.player.bringToTop()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_4', 'right', 200.0, 200.0)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_6', 'right', 160, 600) // TODO: ISSUE LOADING
      }
    }

    //  Check for overlap with leftLevelColliderBot
    if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the second level')
      this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1856.6, 700.0) // 2849.9, 733.7
    }
    //  Check for overlap with leftLevelColliderTop
    if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the sixth level')
      this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 2810.7, 2962.1)
    }
    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the seventh level')
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 246.4, 1976.3)
    }

    // Save the game
    if (this.player.isDead !== true && this.save.overlapWithObject(this.player)) {
      console.info('Saving the game...')
      this.saveLevel(this.name, this.scale.x, this.player.x, this.player.y)
    }
  }
}

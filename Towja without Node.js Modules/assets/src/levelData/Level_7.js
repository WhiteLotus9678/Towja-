/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import FlyingDemon from '../Enemies/FlyingDemon.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level7-data')
  }

  create () {
    super.create()

    this.leftLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 1697.8,
      nextLevel: 'Level_5'
    })
    this.game.add.existing(this.leftLevelColliderBot)

    this.leftLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 0,
      pY: 230.3,
      nextLevel: 'Level_4'
    })
    this.game.add.existing(this.leftLevelColliderTop)

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: 2975.1 + 25,
      pY: 792.1,
      nextLevel: 'Level_8'
    })

    this.game.add.existing(this.rightLevelCollider)
    this.FlyingDemon_0 = new FlyingDemon({
      game: this.game,
      pX: 400,
      pY: 1000,
      pPlayer: this.player,
      pHeightMin: 600,
      pHeightMax: 1000
    })
    this.game.add.existing(this.FlyingDemon_0)
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_6', 'right', 160, 600) // TODO: ISSUE LOADING
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_8', 'right', 181.7, 530.0)
      }
    }

    //  Check for overlap with leftLevelColliderBot
    if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the fifth level')
      this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 2790.2, 1941.7)
    }
    //  Check for overlap with leftLevelColliderTop
    if (this.player.isDead !== true && this.leftLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the fourth level')
      this.loadLevel(this.leftLevelColliderTop.getLevel(), 'left', 2813.6, 736.3)
    }
    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the eigth level')
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 181.7, 530.0)
    }
  }
}

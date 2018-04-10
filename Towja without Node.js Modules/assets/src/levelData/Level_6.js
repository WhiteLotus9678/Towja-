/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import BigDemon from '../Enemies/BigDemon.js'
import Scroll from '../itemData/Scroll.js'
import WallJumping from '../itemData/WallJumping.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level6-data')
  }

  create () {
    super.create()

    this.rightLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 2975.1 + 25,
      pY: 2662.1,
      nextLevel: 'Level_5'
    })
    this.game.add.existing(this.rightLevelColliderBot)

    this.rightLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 2975.1 + 25,
      pY: 222.1,
      nextLevel: 'Level_4'
    })
    this.game.add.existing(this.rightLevelColliderTop)

    this.wallJumpScroll = new Scroll({
      game: this.game,
      pX: 372.2,
      pY: 1163,
      pAbility: new WallJumping(),
      pPlayer: this.player
    })
    this.wallJumpScroll.scale.x *= -1
    this.game.add.existing(this.wallJumpScroll)

    if (this.player.Inventory.hasWallJump) {
      this.wallJumpScroll.deactivate()
    }

    this.player.bringToTop()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_5', 'left', 189.4, 441.0)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_7', 'left', 539, 1997.8)
      }
    }

    //  Check for overlap with rightLevelColliderBot
    if (this.player.isDead !== true && this.rightLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the fourth level')
      this.loadLevel(this.rightLevelColliderBot.getLevel(), 'right', 200.1, 441.0)
    }
    //  Check for overlap with rightLevelColliderTop
    if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the fifth level')
      this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 202.6, 1528.8)
    }
  }
}

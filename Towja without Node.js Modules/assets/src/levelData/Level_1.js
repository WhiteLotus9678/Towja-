/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
// import Scroll from '../itemData/Scroll.js'
// import WallJumping from '../itemData/WallJumping.js'
// import SaveScroll from '../objects/SaveScroll.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level1-data') // TODO: FIX PLAYER STARTING POSITION BY CREATING A GLOBAL VARIABLE
    this.name = 'Level_1'
  }

  create () {
    super.create()

    if (__DEV__) {
      this.leftLevelColliderBot = new LevelCollider({
        game: this.game,
        pX: 0,
        pY: 1030, // 1330 - 300
        nextLevel: 'Level_Start'
      })
      this.game.add.existing(this.leftLevelColliderBot)
    }

    this.rightLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: this.game.width + 200,
      pY: 200,
      nextLevel: 'Level_2'
    })

    this.game.add.existing(this.rightLevelColliderTop)

    // this.save = new SaveScroll({
    //   game: this.game,
    //   pX: 477.2,
    //   pY: 1165
    // })
    // this.game.add.existing(this.save)
    //
    // this.wallJumpScroll = new Scroll({
    //   game: this.game,
    //   pX: 677.2,
    //   pY: 1165,
    //   pAbility: new WallJumping(),
    //   pPlayer: this.player
    // })
    // this.game.add.existing(this.wallJumpScroll)
    //
    // if (this.player.Inventory.hasWallJump) {
    //   this.wallJumpScroll.deactivate()
    // }

    // Makes sure the player passes on top of the saving scroll layer
    this.player.bringToTop()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_Start', 'left', 594.0, 702.3)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_2', 'right', 502.2, 1138.2)
      }
    }

    //  Check for overlap with rightLevelColliderTop
    if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the second level')
      this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 157.6, 750.0)
    }

    if (__DEV__) {
      //  Check for overlap with leftLevelColliderBot
      if (this.player.isDead !== true && this.leftLevelColliderBot.overlapWithObject(this.player)) {
        console.info('Going into the start level')
        this.loadLevel(this.leftLevelColliderBot.getLevel(), 'left', 1055.2, 702.3)
      }
    }
  }
}

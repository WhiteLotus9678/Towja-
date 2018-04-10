import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import PopsDesk from '../sprites/Pops.js'
import SaveScroll from '../objects/SaveScroll.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('LevelStart-data')
  }

  create () {
    super.create()

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: 1206.1,
      pY: 403,
      nextLevel: 'Level_1'
    })
    this.game.add.existing(this.rightLevelCollider)

    this.popsDesk = new PopsDesk({
      game: this.game,
      x: 970,
      y: 470
    })
    this.popsDesk.scale.setTo(1.05, 1.05)
    this.game.add.existing(this.popsDesk)

    this.save = new SaveScroll({
      game: this.game,
      pX: 2000,
      pY: 2000
    })
    this.game.add.existing(this.save)

    this.player.bringToTop()
  }

  update () {
    super.update()

    // Don't show the health bar in the starting level
    this.UIhealth_bar1.visible = false
    this.UIhealth_bar2.visible = false
    this.UIhealth_bar3.visible = false
    this.UIhealth_bar4.visible = false

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Tutorial_0', 'right', 1683.3, 674.0)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_1', 'left', 1629, 434.6)
      }
    }

    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the first level')
      this.saveLevel('Level_Start', this.scale.x, this.player.x, this.player.y)
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 152.1, 1334.7)
    }
  }
}

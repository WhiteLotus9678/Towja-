/* globals __DEV__ */
import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'
import Chest from '../itemData/Chest.js'
import Sword from '../itemData/Sword.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level3-data')
  }

  create () {
    super.create()

    this.rightLevelCollider = new LevelCollider({
      game: this.game,
      pX: this.game.width + 200,
      pY: 120.1,
      nextLevel: 'Level_2'
    })
    this.game.add.existing(this.rightLevelCollider)

    // Create and add a test Chest object
    this.swordChest = new Chest({
      game: this.game,
      pX: 150,
      pY: 570,
      pItem: new Sword(),
      pPlayer: this.player
    })
    this.swordChest.scale.setTo(-0.5, 0.5)
    this.game.add.existing(this.swordChest)

    if (this.player.Inventory.hasSword) {
      this.swordChest.deactivate()
    }

    this.UIhealth_bar1.bringToTop()
    this.UIhealth_bar2.bringToTop()
    this.UIhealth_bar3.bringToTop()
    this.UIhealth_bar4.bringToTop()
    this.player.bringToTop()
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_2', 'right', 502.2, 1138.2)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_4', 'right', 200.0, 200.0)
      }
    }

    //  Check for overlap with rightLevelCollider
    if (this.player.isDead !== true && this.rightLevelCollider.overlapWithObject(this.player)) {
      console.info('Going into the fourth level')
      this.loadLevel(this.rightLevelCollider.getLevel(), 'right', 152.7, 1620)
    }
  }
}

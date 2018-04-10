/* globals __DEV__ */

import Level from '../states/Level.js'
import LevelCollider from '../levelData/LevelCollider.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('Level9-data')
  }

  create () {
    super.create()

    this.rightLevelColliderTop = new LevelCollider({
      game: this.game,
      pX: 1975.1 + 25,
      pY: 506.4,
      nextLevel: 'Level_Final'
    })
    this.game.add.existing(this.rightLevelColliderTop)

    this.rightLevelColliderBot = new LevelCollider({
      game: this.game,
      pX: 1975.1 + 25,
      pY: 4674.4,
      nextLevel: 'Level_4'
    })
    this.game.add.existing(this.rightLevelColliderBot)
  }

  update () {
    super.update()

    if (__DEV__) {
      if (this.previousLevelKey.justPressed()) {
        this.loadLevel('Level_8', 'right', 181.7, 530.0)
      }

      if (this.nextLevelKey.justPressed()) {
        this.loadLevel('Level_Final', 'left', 2156.3, 3156.7)
      }
    }

    //  Check for overlap with rightLevelColliderTop
    if (this.player.isDead !== true && this.rightLevelColliderTop.overlapWithObject(this.player)) {
      console.info('Going into the final scene')
      this.loadLevel(this.rightLevelColliderTop.getLevel(), 'right', 2156.3, 3156.7)
      this.game.state.start('Final_Scene')
    }

    //  Check for overlap with rightLevelColliderBot
    if (this.player.isDead !== true && this.rightLevelColliderBot.overlapWithObject(this.player)) {
      console.info('Going into the fourth level')
      this.loadLevel(this.rightLevelColliderBot.getLevel(), 'right', 200.0, 506.6)
    }
  }
}

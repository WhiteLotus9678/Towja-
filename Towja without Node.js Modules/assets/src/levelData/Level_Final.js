/* globals __DEV__ */

import Level from '../states/Level.js'
import PopsHead from '../PopsBoss/PopsHead.js'

export default class extends Level {
  constructor () {
    // Set player position
    super('LevelFinal-data')
  }

  create () {
    super.create()

    this.popsHead = new PopsHead({
      game: this.game,
      x: this.world.centerX + 100,
      y: this.world.centerY + 200,
      pPlayer: this.player,
      background: this.background
    })

    this.game.add.existing(this.popsHead)

    this.popsHead.scale.setTo(10, 10)

    this.platform = this.game.add.image(2008.0, 3350.0, 'LevelFinalPlatform')
    this.platform.anchor.setTo(0.5, 0.5)
    this.game.add.existing(this.platform)

    this.popsHead.BossHands.bringToTop()

    this.player.x = 2156.3
    this.player.y = 3156.7

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
        this.loadLevel('Level_9', 'right', 815.6, 864.8)
      }

      if (this.nextLevelKey.justPressed()) {
        this.game.state.start('Win')
        // this.loadLevel('Tutorial_0', 'left', 1629, 434.6)
      }
    }
  }
}

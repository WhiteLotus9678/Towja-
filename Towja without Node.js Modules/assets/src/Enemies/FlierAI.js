import Phaser from 'phaser'
import EnemyBase from './EnemyBase.js'

export default class FlierAI extends EnemyBase {
  constructor ({game, pX, pY, speed, spriteName, pPlayer, pHeightMax, pHeightMin}) {
    console.log(game)
    super({
      game: game,
      pX: pX,
      pY: pY,
      pSpeed: speed,
      spriteName,
      pPlayer})
    // Limits on the enemy's movement
    this.heightMin = pHeightMin
    this.heightMax = pHeightMax
    this.movingDown = true
    this.body.velocity.y = speed
  }

  setAnchor (pX, pY) {
    this.anchor.setTo(pX, pY)
  }

  update () {
    super.update()
    if (this.movingDown && this.y >= this.heightMax) {
      this.body.velocity.y = -this.speed
      this.movingDown = false
      console.log('Moving Up')
    } else if (!this.movingDown && this.y <= this.heightMin) {
      this.body.velocity.y = this.speed
      this.movingDown = true
      console.log('Moving Down')
    }
  }
}

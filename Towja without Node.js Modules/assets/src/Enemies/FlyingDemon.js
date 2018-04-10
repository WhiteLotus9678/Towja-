import FlierAI from './FlierAI.js'
import { sequentialNumArray } from '../utils.js'

export default class FlyingDemon extends FlierAI {
  constructor ({game, pX, pY, pPlayer, pHeightMin, pHeightMax}) {
    super({game, pX, pY, speed: 200, spriteName: 'flyingDemon', pPlayer, pHeightMin, pHeightMax})
    this.scale.setTo(0.7, 0.7)
    this.body.clearShapes()
    this.body.addRectangle(80, 60, 0, 0)
    this.body.addToWorld()
    this.body.data.shapes[0].sensor = true

    this.setAnchor(0.5, 0.5)

    this.animations.add('run', [0, 1, 2, 3, 4, 3, 2, 1], 20, true)
    this.animations.add('dead', [0], 10, true)
    this.animations.play('run')

    this.scale.setTo(0.3, 0.3)
  }

  update () {
    super.update()
  }
}

import WalkerAI from './WalkerAI.js'
import { sequentialNumArray } from '../utils.js'

export default class MaskedTurtle extends WalkerAI {
  constructor ({game, pX, pY, pPlayer}) {
    super({game, pX, pY, speed: 125, spriteName: 'David', pPlayer})
    this.body.clearShapes()
    this.body.addRectangle(100, 145, 200, 225)
    this.body.addToWorld()
    this.body.data.shapes[0].sensor = true

    this.setPoints(this.x - 150, this.y - 100, this.x + 150, this.y - 100)
    this.animations.add('run', sequentialNumArray(8, 21), 10, true)
    this.animations.add('dead', [1], 10, true)
    // this.animations.play('run')
  }
}

import WalkerAI from './WalkerAI.js'
import { sequentialNumArray } from '../utils.js'

export default class SmallDemon extends WalkerAI {
  constructor ({game, pX, pY, pPlayer}) {
    super({game, pX, pY, speed: 300, spriteName: 'smallDemon', pPlayer, pointXSet: 45, pointYSet: 40})
    this.scale.setTo(0.7, 0.7)
    this.body.clearShapes()
    this.body.addRectangle(50, 60, 0, 0)
    this.body.addToWorld()
    this.body.data.shapes[0].sensor = true

    this.setAnchor(0.5, 0.5)
    this.setPoints(0, 0, 0, 0)

    this.animations.add('run', sequentialNumArray(0, 4), 20, true)
    this.animations.add('dead', [8, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], 10, true)
    this.animations.play('run')
  }
}

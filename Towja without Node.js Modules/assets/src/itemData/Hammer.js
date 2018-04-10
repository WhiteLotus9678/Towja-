import Item from './Item.js'
import MainPlayer from '../sprites/Player'

export default class Hammer extends Item {
  constructor () {
    // Initialize object basics
    super('Hammer')
    this.isWeapon = true
    this.cooldown = 0.6
  }

  activate (pPlayer) {
    if (pPlayer.health === 1) {
      return
    }
    //  pPlayer.body.y -= 100
    pPlayer.actionState = MainPlayer.actionStates.HAMMER_SWING
    pPlayer.health--
  }
}

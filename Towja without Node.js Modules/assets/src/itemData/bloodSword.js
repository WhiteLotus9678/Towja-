import Item from './Item.js'
import MainPlayer from '../sprites/Player'

export default class BloodSword extends Item {
  constructor () {
    // Initialize object basics
    super('Blood Sword')
    this.isWeapon = true
    this.cooldown = 0.2
  }

  // The player uses health if they use this Item
  activate (pPlayer) {
    //  pPlayer.body.y -= 100
    if (pPlayer.health > 1) {
      pPlayer.actionState = MainPlayer.actionStates.SWORD
      pPlayer.health--
    }
  }
}

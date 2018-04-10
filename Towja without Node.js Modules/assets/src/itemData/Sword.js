import Item from './Item.js'
import MainPlayer from '../sprites/Player'

export default class Sword extends Item {
  constructor () {
    // Initialize object basics
    super('Sword')
    this.isWeapon = true
    this.cooldown = 0.6
  }

  activate (pPlayer) {
    //  pPlayer.body.y -= 100
    pPlayer.actionState = MainPlayer.actionStates.SWORD
  }
}

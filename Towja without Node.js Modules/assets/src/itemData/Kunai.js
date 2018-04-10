import Item from './Item.js'
import MainPlayer from '../sprites/Player'

export default class Kunai extends Item {
  constructor () {
    // Initialize object basics
    super('Kunai')
    this.isWeapon = true
    this.cooldown = 0.3
  }

  activate (pPlayer) {
    pPlayer.actionState = MainPlayer.actionStates.KUNAI
  }
}

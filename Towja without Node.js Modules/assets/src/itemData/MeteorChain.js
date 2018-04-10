import Item from './Item.js'
import MainPlayer from '../sprites/Player'

export default class MeteorChain extends Item {
  constructor () {
    // Initialize object basics
    super('Meteor Chain')
    this.isWeapon = true
    this.cooldown = 0.6
  }

  activate (pPlayer) {
    if (pPlayer.actionState === MainPlayer.actionStates.NONE) {
      pPlayer.actionState = MainPlayer.actionStates.METEOR_CHAIN_SWING
    }
  }
}

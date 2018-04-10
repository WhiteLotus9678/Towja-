import Item from './Item.js'
// import MainPlayer from '../sprites/Player'

export default class WallJumping extends Item {
  constructor () {
    // Initialize object basics
    super('Wall Jump')
    this.isWeapon = false
    this.cooldown = 0.0
  }
}

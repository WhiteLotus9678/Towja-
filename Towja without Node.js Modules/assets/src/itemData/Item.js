export default class Item {
  //  Constructor
  constructor (name) {
    this.name = name
    this.isWeapon = true
    //  Cooldown is given in seconds
    this.cooldown = 2
  }

  //  Activate is called when the player uses the item
  activate (pPlayer) {}
}

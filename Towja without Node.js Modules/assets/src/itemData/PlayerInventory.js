import Inventory from './Inventory.js'

export default class PlayerInventory {
  constructor () {
    this.weaponList = new Inventory()
    this.abilityList = new Inventory()

    // Boolean States for different items
    this.hasSword = false
    this.hasMeteorChain = false
    this.hasHammer = false
    // this.hasWallJump = true
    this.hasWallJump = false
  }

  //  Adds an item to the appropriate inventory list
  addToInventory (pItem) {
    console.log(pItem.name)
    if (pItem.name === 'Sword') {
      this.hasSword = true
    } else if (pItem.name === 'Meteor Chain') {
      this.hasMeteorChain = true
    } else if (pItem.name === 'Hammer') {
      this.hasHammer = true
    } else if (pItem.name === 'Wall Jump') {
      this.hasWallJump = true
    }

    console.info('Pickup called in PlayerInventory')
    //  New Item is a Weapon
    if (pItem.isWeapon) {
      this.weaponList.add(pItem)
    } else {
    //  New Item is an Ability
      this.abilityList.add(pItem)
    }
  }

  //  Use the current Weapon
  useWeapon () {
    this.weaponList.useItem()
  }

  //  Use the current Ability
  useAbility () {
    this.abilityList.useItem()
  }

  //  Returns the current Weapon
  getWeapon () {
    return this.weaponList.getItem()
  }

  //  Returns the current Ability
  getAbility () {
    return this.abilityList.getItem()
  }
  //  Change Ability
  nextAbility () {
    return this.abilityList.getNextItem()
  }
  previousAbility () {
    return this.abilityList.getPreviousItem()
  }

  //  Change Weapon
  nextWeapon () {
    return this.weaponList.getNextItem()
  }
  previousWeapon () {
    return this.weaponList.getPreviousItem()
  }
}

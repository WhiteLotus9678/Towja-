export default class InventoryList {
  //  ItemList is an array of all the items in the player's Inventory
  //  curItem indicates which item in the array the player has equipped
  constructor () {
    this.ItemList = []
    this.curItem = -1
  }

  //  Add an ability to the inventory
  add (pItem) {
    console.info('Pickup called in Inventory')
    this.ItemList.push(pItem)
    this.curItem = this.ItemList.length - 1
  }

  //  Returns the next item in the inventory
  getNextItem () {
    //  If inventory is empty
    if (this.curItem === -1) {
      return null
    }

    //  Move to the next item
    if (this.curItem < this.ItemList.length - 1) {
      this.curItem++
    } else {
    //  Current item is the last item in the array

      //  Cycle back around to the first element
      this.curItem = 0
    }
    //  Return the item
    return this.ItemList[this.curItem]
  }

  //  Returns the previous array element
  getPreviousItem () {
    //  If inventory is empty
    if (this.curItem === -1) {
      return null
    }

    //  Move to the previous item
    if (this.curItem > 0) {
      this.curItem--
    } else {
    //  Cycle back around to the last element
      this.curItem = this.ItemList.length - 1
    }
    //  Return the item
    return this.ItemList[this.curItem]
  }

  //  Activates the current item
  useItem () {
    if (this.ItemList.length > 0) {
      this.ItemList[this.curItem].activate()
    }
  }

  //  Returns the current item
  getItem () {
    return this.ItemList[this.curItem]
  }
}

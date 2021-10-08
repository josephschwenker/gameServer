actions.disband = new Action()
actions.disband.name = 'Disband'
actions.disband.shortcut = 'd'
actions.disband.isAvailable = function() {
  if ( game.active instanceof Unit ) {
    return true
  }
  else {
    return false
  }
}
actions.disband.do = function() {
  if ( actions.disband.isAvailable() ) {
    // remove unit from tile
    let tile = game.map.getTileByItemId(game.active.id)
    tile.units.removeLast(game.active)
    // remove unit from unitList
    game.unitList.removeLast(game.active)
    game.active = undefined
    paintMap()
  }
  else {
    play(INVALID_COMMAND)
  }
}

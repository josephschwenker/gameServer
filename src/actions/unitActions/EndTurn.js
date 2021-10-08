actions.endTurn = new Action()
actions.endTurn.name = 'End Turn'
actions.endTurn.shortcut = 'Enter'
actions.endTurn.actionBarIndex = 0
actions.endTurn.isAvailable = function() {
  if ( !(game.active instanceof City) ) {
    return true
  }
  else {
    return false
  }
}
actions.endTurn.do = function() {
  if ( actions.endTurn.isAvailable() ) {
    // advance structure construction, reset unit moves
    for (let unit of game.unitList) {
      if (unit instanceof EngineerSkimmer) {
        unit.advanceTerraform()
      }
      // reset this unit's moves
      unit.resetMoves()
    }
    // advance facility and unit construction
    for (let city of game.cityList) {
      //game.active = city // quick and dirty workaround ;)
      city.build()
    }
    game.turn++
    paintMap()
    // select next idle unit if no unit selected
    if (game.active == undefined) {
      nextIdle()
    }
  }
}
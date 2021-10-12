actions.buildCity = new Action()
actions.buildCity.name = 'Build City'
actions.buildCity.shortcut = 'b'
  
actions.buildCity.isAvailable = function() {
  if ( game.active instanceof PodSkimmer && game.active.currentMoves > 0 ) {
    return true
  }
  else {
    return false
  }
}
actions.buildCity.do = function() {
  if ( actions.buildCity.isAvailable() ) {
    if (game.active.currentMoves >= 1) {
    let city = new City()
    city.generateName()
    // put city on the map
    let coordinates = game.getCoordinatesOf(game.active)
    let tile = game.map.getTile(coordinates)
    tile.city = city
    // remove any structures
    tile.structures = []
    game.cityList.push(city)
    actions.disband.do()
    paintMap()
    // open the most recently-created city
    game.active = game.cityList[game.cityList.length-1]
    openBaseControl()
    }
  }
  else {
    play(INVALID_COMMAND)
  }
}

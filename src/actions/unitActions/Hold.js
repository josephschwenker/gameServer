actions.hold = new Action()
actions.hold.name = 'Hold'
actions.hold.shortcut = 'h'
actions.hold.isAvailable = function() {
  if ( game.active instanceof Unit ) {
    return true
  }
  else {
    return false
  }
}
actions.hold.do = function() {
  if ( actions.hold.isAvailable() ) {
    game.active.status = status.hold
    paintMap()
  }
}

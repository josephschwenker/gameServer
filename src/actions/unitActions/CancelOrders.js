actions.cancelOrders = new Action()
actions.cancelOrders.name = 'Cancel Orders'
actions.cancelOrders.shortcut = 'c'
actions.cancelOrders.isAvailable = function() {
  if ( game.active instanceof Unit ) {
    if ( game.active.status !== status.idle && game.active.status !== status.outOfMoves ) {
      return true
    }
    else {
      return false
    }
  }
  else {
    return false
  }
}
actions.cancelOrders.do = function() {
  if ( actions.cancelOrders.isAvailable() ) {
    game.active.status = status.idle
    paintMap()
  }
}

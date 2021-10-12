static class NextUnit extends Action {
  name = 'Next Unit'
  shortcut = 'w'
  actionBarIndex = 0

  isAvailable = () => {

  }

  do = () => {
    
  }
}

actions.nextUnit = new Action()
actions.nextUnit.name = 'Next Unit'
actions.nextUnit.shortcut = 'w'
actions.nextUnit.actionBarIndex = 0
actions.nextUnit.isAvailable = function() {
  return true
}
actions.nextUnit.do = function() {
  if ( actions.nextUnit.isAvailable() ) {
    nextIdle()
  }
  else {
    
  }
}

// Action specifies a command a user can carry out by clicking a button or pressing a keyboard shortcut
class Action {
  constructor() {
    this.name = ''
    this.actionBarIndex = 0
    this.shortcut = ''
  }
  
  isAvailable = function() {
    return false
  }
  do = function() {
    if ( this.isAvailable() ) {
      
    }
    else {
      
    }
  }
}

export default Action

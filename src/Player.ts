import Searchable from './utility/Searchable'
import Faction from './factions/Faction'
import List from './utility/List'
import ResearchItem from './research/ResearchItem'

class Player implements Searchable {
  id: number
  name: string
  faction: Faction
  researched: List<ResearchItem> = new List<ResearchItem>()
  private password: string

  constructor (
    options: {
      id: number
      name: string
      faction: Faction
      password: string
    }
  ) {
    this.id = options.id
    this.name = options.name
    this.faction = options.faction
    this.password = options.password
  }

  changePassword (oldPassword: string, newPassword: string): boolean {
    if (oldPassword === this.password) {
      this.password = newPassword
      return true
    } else {
      return false
    }
  }
}

export default Player

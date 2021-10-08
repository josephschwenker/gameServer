import Searchable from '../utility/Searchable'

class ResearchItem implements Searchable {
  id: number
  name: string
  description: string
  unlocks: ResearchItem[]

  constructor (
    options: {
      id: number
      name: string
      description: string
      unlocks: ResearchItem[]
    }
  ) {
    this.id = options.id
    this.name = options.name
    this.description = options.description
    this.unlocks = options.unlocks
  }
}

export default ResearchItem

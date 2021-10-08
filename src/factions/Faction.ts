class Faction {
  name: string
  color: string
  cityNames: string[]

  constructor (
    options: {
      name: string
      color: string
      cityNames: string[]
    }
  ) {
    this.name = options.name
    this.color = options.color
    this.cityNames = options.cityNames
  }
}

export default Faction

import Yield from '../Yield'

abstract class TileFeature {
  yield: Yield
  attackMultiplier: number
  defenseMultiplier: number

  constructor (
    options: {
      yield: Yield
      attackMultiplier?: number
      defenseMultiplier?: number
    }
  ) {
    this.yield = options.yield
    this.attackMultiplier = options.attackMultiplier ?? 1
    this.defenseMultiplier = options.defenseMultiplier ?? 1
  }
}

export default TileFeature

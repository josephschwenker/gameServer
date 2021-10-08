import Effect from '../Effect'
import TileEffectParameters from './TileEffectParameters'
import TileEffectResult from './TileEffectResult'
import TileEffectTarget from './TileEffectTarget'

class TileEffect implements Effect<TileEffectResult> {
  name: string
  icon: string
  targets: TileEffectTarget
  constructor (
    options: {
      name: string
      icon: string
      targets: TileEffectTarget
    }
  ) {
    this.name = options.name
    this.icon = options.icon
    this.targets = options.targets
  }

  yield (options: TileEffectParameters): TileEffectResult {
    return new TileEffectResult(
      {
        options: this.targets.yield(options)
      }
    )
  }
}

export default TileEffect

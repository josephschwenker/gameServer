import EffectModifier from '../EffectModifier'
import TileEffectParameters from './TileEffectParameters'
import TileEffectResult from './TileEffectResult'

interface TileEffectTargetOptions {
  food: EffectModifier
  minerals: EffectModifier
}

abstract class TileEffectTarget {
  options: TileEffectTargetOptions

  constructor (
    options: TileEffectTargetOptions
  ) {
    this.options = options
  }

  yield (options: TileEffectParameters): TileEffectResult {
    return new TileEffectResult(
      {
        food: {
          add: this.options.food.add(this.options)

      }
    )
  }
}

export default TileEffectTarget

import EffectResult from '../EffectResult'
import EffectResultModifier from '../EffectResultModifier'

class TileEffectResult implements EffectResult<TileEffectResult> {
  food: EffectResultModifier
  minerals: EffectResultModifier

  constructor (
    options: {
      food: EffectResultModifier
      minerals: EffectResultModifier
    }
  ) {
    this.food = options.food
    this.minerals = options.minerals
  }

  add = (otherResult: TileEffectResult): TileEffectResult => {
    return new TileEffectResult(
      {
        food: {
          add: this.food.add + otherResult.food.add,
          multiply: this.food.multiply + otherResult.food.multiply
        },
        minerals: {
          add: this.minerals.add + otherResult.minerals.add,
          multiply: this.minerals.multiply + otherResult.minerals.multiply
        }
      }
    )
  }

  addAll = (results: TileEffectResult[]): TileEffectResult => {
    return results
      .reduce(
        (previous, current) => previous.add(current)
      )
  }
}

export default TileEffectResult

import EffectResultModifier from './EffectResultModifier'

class EffectResult {
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

  static add = (otherResult: EffectResult): EffectResult => {
    return new EffectResult(
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

  static addAll = (results: EffectResult[]): EffectResult => {
    return results
      .reduce(
        (previous, current) => previous.add(current)
      )
  }
}

export default EffectResult

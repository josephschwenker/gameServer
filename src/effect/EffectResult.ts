import { EffectResultModifier, EffectTargets } from './EffectTypes'

class EffectResult<EffectTargetsSubtype extends EffectTargets> {
  targets: { [key in keyof EffectTargetsSubtype]: EffectResultModifier }

  constructor (
    targets: { [key in keyof EffectTargetsSubtype]: EffectResultModifier }
  ) {
    this.targets = targets
  }

  add = (otherResult: EffectResult<EffectTargetsSubtype>): EffectResult<EffectTargetsSubtype> => {
    const targets: { [key in keyof EffectTargetsSubtype]: EffectResultModifier } = {} as any
    Object.keys(otherResult.targets)
      .map(
        (target): void => {
          targets[target as keyof EffectTargetsSubtype] = {
            add: this.targets[target].add + otherResult.targets[target].add,
            multiply: this.targets[target].multiply + otherResult.targets[target].multiply
          }
        }
      )
    return new EffectResult<EffectTargetsSubtype>(
      targets
    )
  }

  static addAll = <EffectTargetsSubtype> (results: Array<EffectResult<EffectTargetsSubtype>>): EffectResult<EffectTargetsSubtype> => {
    return results
      .reduce(
        (previous, current) => previous.add(current)
      )
  }
}

export default EffectResult

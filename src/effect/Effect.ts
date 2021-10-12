import { EffectParameters, EffectResultModifier, EffectTargets } from './EffectTypes'
import EffectResult from './EffectResult'

export class Effect<
  EffectParametersSubtype extends EffectParameters,
  EffectTargetsSubtype extends EffectTargets,
> {
  name: string
  description: string
  icon: string
  targets: EffectTargetsSubtype

  constructor (
    options: {
      name: string
      description: string
      icon: string
      targets: EffectTargetsSubtype
    }
  ) {
    this.name = options.name
    this.description = options.description
    this.icon = options.icon
    this.targets = options.targets
  }

  yield (options: EffectParametersSubtype): EffectResult<EffectTargetsSubtype> {
    return new EffectResult<EffectTargetsSubtype>(
      this.targets.reduce(
        (accumulator: {[key in keyof EffectTargetsSubtype]: EffectResultModifier}, target: keyof EffectTargetsSubtype) => {
          accumulator[target] = {
            add: this.targets[target].add(options),
            multiply: this.targets[target].multiply(options)
          }
          return accumulator
        }
      )
    )
  }
}

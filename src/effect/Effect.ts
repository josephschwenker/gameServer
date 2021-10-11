import { EffectParameters, EffectResultModifier, EffectTargets } from './EffectModifier'
import EffectResult from './EffectResult'

export class Effect<
  EffectParametersSubtype extends EffectParameters,
  EffectTargetsSubtype extends EffectTargets,
> {
  name: string
  icon: string
  targets: EffectTargetsSubtype

  constructor (
    options: {
      name: string
      icon: string
      targets: EffectTargetsSubtype
    }
  ) {
    this.name = options.name
    this.icon = options.icon
    this.targets = options.targets
  }

  yield (options: EffectParametersSubtype): EffectResult<EffectTargetsSubtype> {
    const targets: {[key in keyof EffectTargetsSubtype]: EffectResultModifier} = {} as any
    Object.keys(this.targets)
      .map(
        (target) => {
          targets[target as keyof EffectTargetsSubtype] = {
            add: this.targets[target].add(options),
            multiply: this.targets[target].multiply(options)
          }
        }
      )
    return new EffectResult<EffectTargetsSubtype>(
      targets
    )
  }
}

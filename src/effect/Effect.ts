import EffectModifier from './EffectModifier'
import EffectResultModifier from './EffectResultModifier'

export interface EffectParameters {
  [key: string]: any
}

export interface EffectResult {
  [key: string]: EffectResultModifier
}

export class Effect<EffectParametersSubtype extends EffectParameters, EffectResultSubtype extends EffectResult> {
  name: string
  icon: string
  targets: { [key: string]: EffectModifier<EffectParametersSubtype> }

  constructor (
    options: {
      name: string
      icon: string
      targets: { [key: string]: EffectModifier<EffectParametersSubtype> }
    }
  ) {
    this.name = options.name
    this.icon = options.icon
    this.targets = options.targets
  }

  yield (options: EffectParametersSubtype): EffectResultSubtype {
    const effectResult: EffectParameters = {}
    Object.keys(this.targets)
      .map(
        (target) => {
          effectResult[target] = {
            add: this.targets[target].add(options),
            multiply: this.targets[target].multiply(options)
          }
        }
      )
    return effectResult
  }
}

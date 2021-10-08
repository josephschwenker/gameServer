import { EffectParameters } from './Effect'

interface EffectModifier<EffectParametersSubtype extends EffectParameters> {
  add: (options: EffectParametersSubtype) => number
  multiply: (options: EffectParametersSubtype) => number
}

export default EffectModifier

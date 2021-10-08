import EffectParameters from './EffectParameters'

interface EffectModifier {
  add: (options: EffectParameters) => number
  multiply: (options: EffectParameters) => number
}

export default EffectModifier

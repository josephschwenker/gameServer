import EffectResult from './EffectResult'
import EffectTarget from './EffectTarget'
import EffectParameters from './EffectParameters'

class Effect<T> {
  name: string
  icon: string
  targets: EffectTarget
  yield: (options: EffectParameters) => EffectResult<T>
}

export default Effect

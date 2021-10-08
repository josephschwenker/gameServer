// import EffectResultModifier from './EffectResultModifier'

interface EffectResult<T> {
  // food: EffectResultModifier
  // minerals: EffectResultModifier
  add: (otherResult: T) => T
  addAll: (results: T[]) => T
}

export default EffectResult

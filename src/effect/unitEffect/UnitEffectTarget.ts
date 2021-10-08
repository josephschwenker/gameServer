import UnitEffectParameters from './UnitEffectParameters'

interface UnitEffectTarget {
  attack: (options: UnitEffectParameters) => number
  defense: (options: UnitEffectParameters) => number
}

export default UnitEffectTarget

import Unit from '../../Unit'
import { Effect } from '../Effect'
import { EffectParameters, EffectTargets } from '../EffectTypes'

interface Parameters extends EffectParameters {
  city: Unit
}

interface Targets extends EffectTargets {
  agriculture: any
  industry: any
  economy: any
  science: any
  morale: any
}

type CityEffect = Effect<Parameters, Targets>

export default CityEffect

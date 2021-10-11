import Tile from '../../Tile'
import Unit from '../../Unit'
import { Effect } from '../Effect'
import { EffectParameters, EffectTargets } from '../EffectTypes'

interface Parameters extends EffectParameters {
  unit: Unit
  tile: Tile
}

interface Targets extends EffectTargets {
  attack: any
  defense: any
}

type UnitEffect = Effect<Parameters, Targets>

export default UnitEffect

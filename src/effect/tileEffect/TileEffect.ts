import Tile from '../../Tile'
import { Effect } from '../Effect'
import { EffectParameters, EffectTargets } from '../EffectTypes'

interface Parameters extends EffectParameters {
  tile: Tile
}

interface Targets extends EffectTargets {
  food: any
  minerals: any
}

type TileEffect = Effect<Parameters, Targets>

export default TileEffect

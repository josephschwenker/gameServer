import City from './City'
import List from './utility/List'
import Structure from './tileFeatures/Structure'
import Terrain from './tileFeatures/Terrain'
import Unit from './Unit'
import TransportationFeature from './tileFeatures/TransportationFeature'
import SpecialFeature from './tileFeatures/SpecialFeature'

class Tile {
  features: {
    terrain: Terrain
    structure: Structure
    road: TransportationFeature
    special: SpecialFeature
  }

  units: List<Unit>
  city: City

  constructor (
    options:
    {
      features: {
        terrain: Terrain
        structure: Structure
        road: TransportationFeature
        special: SpecialFeature
      }
      units: List<Unit>
      city: City
    }
  ) {
    this.features = options.features
    this.units = options.units
    // store unfinished structures in structureQueue
    // this.structureQueue = null
    this.city = options.city
  }
}

export default Tile

import City from './City'
import List from './utility/List'
import Structure from './TileFeature/Structure/Structure'
import Terrain from './TileFeature/Terrain/Terrain'
import Unit from './Unit'
import TransportationFeature from './TileFeature/TransportationFeature/TransportationFeature'
import SpecialFeature from './TileFeature/SpecialFeature/SpecialFeature'

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

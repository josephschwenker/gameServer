import GameMap from '../GameMap'
import InvalidCoordinate from './InvalidCoordinate'
import TripleVector from './TripleVector'
import ValidCoordinate from './ValidCoordinate'

function Coordinate (vector: TripleVector, map: GameMap): InvalidCoordinate | ValidCoordinate {
  if (map.getTile(vector) === undefined) {
    return new InvalidCoordinate(vector.x, vector.y, vector.z)
  } else {
    return new ValidCoordinate(vector.x, vector.y, vector.z)
  }
}

export default Coordinate

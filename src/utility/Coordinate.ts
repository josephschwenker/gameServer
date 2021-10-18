import GameMap from '../GameMap'
import TripleVector from './TripleVector'
import ValidCoordinate from './ValidCoordinate'

export type Coordinate = ValidCoordinate | undefined

export function coordinate (vector: TripleVector, map: GameMap): ValidCoordinate | undefined {
  if (map.getTile(vector) === undefined) {
    return undefined
  } else {
    return new ValidCoordinate(vector.x, vector.y, vector.z)
  }
}

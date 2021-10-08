import TripleVector from './TripleVector'
import ValidCoordinate from './utility/ValidCoordinate'

// GraphNode represents a node used for storing tile coordinates for pathfinding
class GraphNode {
  coordinates: ValidCoordinate
  visited: boolean = false
  distance: number = Infinity
  vector: TripleVector | undefined = undefined
  turns: number = Infinity
  parent: GraphNode | undefined = undefined

  constructor (c: ValidCoordinate) {
    this.coordinates = c
  }

  equals (node: GraphNode): boolean {
    return this.coordinates === node.coordinates
  }
}

export default GraphNode

import Tile from './Tile'
import OpenOcean from './tileFeatures/terrain/OpenOcean'
import FlotationFarm from './tileFeatures/structures/FlotationFarm'
import Tile from './Tile'

class GameMap {
  #map: Tile[][][]
  size: number
  minLayer: number
  maxLayer: number

  constructor (size: number, minLayer: number, maxLayer: number) {
    this.size = size
    this.minLayer = minLayer
    this.maxLayer = maxLayer

    this.#map[0] =
    new Array(this.size)
    .fill(
      new Array(
        new Tile(
          {
            terrain: OpenOcean,
            structure: FlotationFarm
          }
        )
      )
    )
  }
  
  getTile(c) {
    // check bounds
    if ( this.#map[c.z] ) {
      if ( this.#map[c.z][c.y] ) {
        return this.#map[c.z][c.y][c.x]
      }
    }
    // not in bounds
    return undefined
  }
  
  setTile(c, value) {
    // check bounds
    if ( this.#map[c.z] != undefined ) {
      if ( this.#map[c.z][c.y] != undefined ) {
        this.#map[c.z][c.y][c.x] = value
      }
    }
    // not in bounds
  }
  
  tileExists(c) {
    if (this.#map.getTile(c) != undefined) {
      return true
    }
    else {
      return false
    }
  }
  
  getNeighbors(c) {
    // returns an array of a tile's neighbors
    let neighbors = []
    neighbors.push( new Tuple(c.x+1, c.y, c.z) )
    neighbors.push( new Tuple(c.x-1, c.y, c.z) )
    
    neighbors.push( new Tuple(c.x, c.y+1, c.z) )
    neighbors.push( new Tuple(c.x, c.y-1, c.z) )
    
    neighbors.push( new Tuple(c.x+1, c.y+1, c.z) )
    neighbors.push( new Tuple(c.x-1, c.y-1, c.z) )
    
    neighbors.push( new Tuple(c.x+1, c.y-1, c.z) )
    neighbors.push( new Tuple(c.x-1, c.y+1, c.z) )
    
    // remove any tiles that do not exist
    let validNeighbors = []
    for (let n of neighbors) {
      if ( this.#map.tileExists(n) ) {
        validNeighbors.push(n)
      }
    }
    return validNeighbors
  }
  
  getTileByItemId(id) {
    let c = this.#map.getCoordinatesByItemId(id)
    return this.#map.getTile(c)
  }

  getItemById(id) {
    let z=0
    for (let y=0; y<this.#map.size; y++) {
      for (let x=0; x<this.#map.size; x++) {
        let tile = this.#map.getTile( new Tuple(x, y, z) )
        if (tile.units.length !== 0) {
          for (let i=0; i<tile.units.length; i++) {
            if (tile.units[i].id == id) {
              return tile.units[i]
            }
          }
        }
        if (tile.city !== undefined) {
          if (tile.city.id == id) {
            return tile.city
          }
        }
      }
    }
  }

  getCoordinatesByItemId(id) {
    let z=0
    for (let y=0; y<this.size; y++) {
      for (let x=0; x<this.size; x++) {
        let tile = this.#map.getTile( new Tuple(x, y, z) )
        let units = tile.units
        if (units.length !== 0) {
          for (let i=0; i<units.length; i++) {
            if ( units[i].id == id ) {
              return new Tuple(x, y, z)
            }
          }
        }
        let city = tile.city
        if (city !== undefined) {
          if (city.id === id) {
            return new Tuple(x, y, z)
          }
        }
      }
    }
  }
  
  getPath(nodeGraph, destination) {
    // follow predecessors
    let path = []
    let previous = nodeGraph[destination]
    while (previous !== undefined) {
      path.push(previous)
      previous = previous.parent
    }
    path.reverse()
    return path
  }
  
  generateNodeGraph(source) {
    // yay, graph theory
    
    // create a map from tile coordinates to graph nodes
    let m = {}
    m[source] = new Node(source)
    m[source].distance = 0
    m[source].turns = 0
    
    let currentNode = m[source]
    
    // must store indices of nodes, not the nodes themselves
    let unvisited = new Set()
    unvisited.add(currentNode.coordinates)
    
    // prevent infinite loops
    let max = 9999
    let ticks = 0
    
    while ( unvisited.size > 0 && ticks<max ) {
      
      ticks++
      if (ticks === max) {
        console.error('generateNodeGraph exceeded its maximum running time')
      }
      
      // mark this node as visited and remove it from the list of unvisited nodes
      currentNode.visited = true
      unvisited.delete(currentNode.coordinates)
      if ( unvisited.size > Math.pow(this.#map.size, 2) ) {
        throw new Error('Too many nodes')
        break
      }
      
      // get neighbors
      let neighbors = this.#map.getNeighbors(currentNode.coordinates)
      
      // calculate new distance
      let newDistance = currentNode.distance + 1
      
      // add neighbors' distances to the hashmap
      for (let n of neighbors) {
        // add each neighbor to the hashmap if not already present
        if ( m[n] == undefined ) {
          m[n] = new Node(n)
        }
        n = m[n]
        // check all unvisited neighbors
        if ( !n.visited ) {
          let newTurns = currentNode.turns
          // calculate this neighbor's vector
          let newVector = n.coordinates.subtract(currentNode.coordinates)
          // calculate turns
          if ( currentNode.vector !== undefined ) {
            // parent has a vector, so check if it matches the new one
            if ( !newVector.equals(currentNode.vector) ) {
              // vectors do not equal, so increment turns
              newTurns++
            }
          }
          
          if ( newDistance < n.distance || ( newDistance == n.distance && newTurns < n.turns ) ) {
            // update distance
            n.distance = newDistance
            // update turns
            n.turns = newTurns
            // update vector
            n.vector = newVector
            // update parent
            n.parent = currentNode
          }
          // add this node to the list of unvisited nodes
          unvisited.add(n.coordinates)
        }
      }
      // choose the closest unvisited node for the next iteration
      let smallestDistance = Infinity
      let smallestNode
      for (let n of unvisited) {
        let candidateNode = m[n]
        if (candidateNode.distance < smallestDistance) {
          smallestDistance = candidateNode.distance
          smallestNode = candidateNode
        }
      }
      currentNode = smallestNode
    }
    return m
  }
}

export default GameMap

import Searchable from './utility/Searchable'
import Piece from './Piece'
import List from './utility/List'
import Facility from './Facility/Facility'
import CityStatus from './Status/statuses/CityStatus'
import Player from './Player'

class City implements Piece, Searchable {
  id: number
  name: string
  owner: Player
  population: number = 1
  sound: string = 'sound/menu2.wav'
  facilities: List<Facility>
  doing: CityStatus
  productionQueue: List<Facility>

  constructor (
    options: {
      id: number
      name: string
      owner: Player
      facilities: Facility[]
    }
  ) {
    this.id = options.id
    this.name = options.name
    this.owner = options.owner
    this.facilities = new List<Facility>(options.facilities)
    this.productionQueue = new List<Facility>()
    this.doing = NoProduction
  }

  productionMenu (): List<Facility> {

  }
    
  queueProduction(productionTarget) {
    game.active.productionQueue.push(
      new productionTarget()
    )
    // if this is a facility, remove it from the city's production menu
    if ( game.active.productionQueue[game.active.productionQueue.length-1] instanceof Facility ) {
      game.active.productionMenu.removeLast( productionTarget )
    }
    // update city status
    if ( game.active.productionQueue.length != 0 ) {
      game.active.status = new CityStatus( game.active.productionQueue[0].constructor.fullName, game.active.getTurnsLeft() )
    }
    else {
      game.active.status = status.idle
    }
  }

  getTurnsLeft() {
    return Math.ceil(
      (this.productionQueue[0].constructor.mineralCost - this.productionQueue[0].currentMinerals) / this.getTotalResource('minerals')
    )
  }

  build() {
    // advance production if there is an item in the queue
    if ( this.productionQueue.length != 0 ) {
      // advance construction progress on end turn
      let mineralsPerTurn = this.getTotalResource('minerals')
      let currentProduction = this.productionQueue[0]
      // only advance production on production with finite costs (not Stockpile Minerals)
      if ( currentProduction.constructor.mineralCost != Infinity ) {
        currentProduction.currentMinerals += mineralsPerTurn
      }
      if (currentProduction.currentMinerals >= currentProduction.constructor.mineralCost) {
        // production complete, append to facilities list or create unit
        if (currentProduction instanceof Facility) {
          this.facilities.push(currentProduction)
          // play sound
          play(PRODUCTION_COMPLETE)
        }
        else if (currentProduction instanceof Unit) {
          // add unit to map, then push to unitList
          let c = game.map.getCoordinatesByItemId(this.id)
          game.map.getTile(c).units.push(currentProduction)
          game.unitList.push(currentProduction)
          // play sound
          play(PRODUCTION_COMPLETE)
        }
        // remove the finished item
        this.productionQueue.removeLast(currentProduction)
      }
      // update city status
      if ( this.productionQueue.length != 0 ) {
        this.status = new CityStatus(
          this.productionQueue[0].constructor.fullName,
          this.getTurnsLeft()
        )
      }
      else {
        this.status = status.noProduction
      }
    }
  }

  generateName() {
    let i = Math.floor( Math.random()*game.cityNamesList.length )
    let name = game.cityNamesList[i]
    // remove name so it cannot be used again
    game.cityNamesList.removeLast(name)
    this.fullName = name
  }

  getResourceTiles() {
    let c = game.map.getCoordinatesByItemId(this.id)
    let resourceTiles = []
    resourceTiles.push( new Tuple(c.x, c.y, c.z) )
    
    resourceTiles.push( new Tuple(c.x-1, c.y-2, c.z) )
    resourceTiles.push( new Tuple(c.x+1, c.y+2, c.z) )
    
    resourceTiles.push( new Tuple(c.x, c.y-2, c.z) )
    resourceTiles.push( new Tuple(c.x, c.y+2, c.z) )
    
    resourceTiles.push( new Tuple(c.x+1, c.y-2, c.z) )
    resourceTiles.push( new Tuple(c.x-1, c.y+2, c.z) )
    
    resourceTiles.push( new Tuple(c.x-2, c.y-1, c.z) )
    resourceTiles.push( new Tuple(c.x+2, c.y+1, c.z) )
    
    resourceTiles.push( new Tuple(c.x-1, c.y-1, c.z) )
    resourceTiles.push( new Tuple(c.x+1, c.y+1, c.z) )
    
    resourceTiles.push( new Tuple(c.x, c.y-1, c.z) )
    resourceTiles.push( new Tuple(c.x, c.y+1, c.z) )
    
    resourceTiles.push( new Tuple(c.x+1, c.y-1, c.z) )
    resourceTiles.push( new Tuple(c.x-1, c.y+1, c.z) )
    
    resourceTiles.push( new Tuple(c.x-2, c.y, c.z) )
    resourceTiles.push( new Tuple(c.x+2, c.y, c.z) )
    
    resourceTiles.push( new Tuple(c.x-1, c.y, c.z) )
    resourceTiles.push( new Tuple(c.x+1, c.y, c.z) )
    
    resourceTiles.push( new Tuple(c.x-2, c.y+1, c.z) )
    resourceTiles.push( new Tuple(c.x+2, c.y-1, c.z) )
    
    return resourceTiles
  }
  // holy dooly folks, this is a big one
  getTileResource(c, resource) {
    if ( game.map.tileExists(c) ) {
      // c is the coordinates of the tile we are getting resource values for
      // get resources before modifiers
      let output = game.map.getTile(c)[resource]
      // cc is the coordinates of the corresponding city for this tile
      let cc = game.map.getCoordinatesByItemId(this.id)
      
      // city tile, no structures allowed
      if ( cc.equals(c) ) {
        // look through facilities instead
        
        // if Industrial Base, max(2, output)
        if ( this.facilities.find( i => i instanceof IndustrialBase) ) {
          output = Math.max(2, output)
        }
        // if Recycler, output+1
        if ( this.facilities.find( i => i instanceof Recycler) ) {
          output = output + 1
        }
      }
      // non-base tile, use standard calculation
      else {
        // apply modifiers from structures, if any
        let structures = game.map.getTile(c).structures
        // flotation farm
        if (resource == 'food') {
          if ( structures.find( i => i instanceof FlotationFarm) !== undefined ) {
            output += 1
          }
        }
        // solar array
        if (resource == 'credits') {
          if ( structures.find( i => i instanceof SolarArray) !== undefined ) {
            output += 1
          }
        }
      }
      // apply facility modifiers for base/non-base tiles
      return output
    }
    else {
      // tile does not exist
      return 0
    }
  }
  drawResources() {
    let resourceTiles = this.getResourceTiles()
    for (let c of resourceTiles) {
      if ( game.map.tileExists(c) ) {
        let tile = getUiTileByCoordinates(c)
        let span = document.createElement('span')
        span.className = 'resourceLabel'
        span.textContent = 
          this.getTileResource(c, 'food') + ' ' +
          this.getTileResource(c, 'minerals') + ' ' +
          this.getTileResource(c, 'credits')
        tile.appendChild(span)
      }
    }
  }
  getTotalResource(resource) {
    let resourceTiles = this.getResourceTiles()
    let total = 0
    for (let c of resourceTiles) {
      total += this.getTileResource(c, resource)
    }
    return total
  }
}

export default City

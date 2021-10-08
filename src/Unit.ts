import EquipmentModule from './unitModules/EquipmentModule'
import Fraction from './Fraction'
import Piece from './Piece'
import Status from './status/Status'
import UnitModule from './unitModules/UnitModule'

class Unit implements Piece {
  id: number
  name: string
  attack: number
  defense: number
  moves: Fraction
  paid: Fraction
  health: Fraction
  upkeep: number
  available: boolean
  status: Status
  modules: {
    equipment: EquipmentModule
    special: UnitModule
  }

  constructor (
    options:
    {
      id: number
      name: string
      attack: number
      defense: number
      moves: Fraction
      paid: Fraction
      health: Fraction
      upkeep: number
      status: Status
      available: boolean
      modules: {
        chassis: UnitModule
        equipment: EquipmentModule
        armor: UnitModule
        special: UnitModule
      }
    }
  ) {
    this.id = options.id
    this.name = options.name
    this.attack = options.attack
    this.defense = options.defense
    this.moves = options.moves
    this.paid = options.paid
    this.health = options.health
    this.upkeep = options.upkeep
    this.status = options.status
    this.available = options.available
    this.modules = options.modules
  }

  getDefaultName (): string {
    return `${this.modules.special.name} ${this.modules.equipment.name}`
  }

  resetMoves (): void {
    this.moves = new Fraction(0, this.moves.denominator)
  }

  // moveTo (c: ValidCoordinate): void {
  //   const tile = this.map.getTile(c)
  //   // find path
  //   game.nodeMap = game.map.generateNodeGraph(source)
  //   let path = game.map.getPath(game.nodeMap, destination)
  //   // move along path one tile at a time
  //   for (let n of path) {
  //     // get .unit element
  //     let unitDiv = document.getElementById(this.id)
  //     // set top and left coordinates
  //     unitDiv.style.left = unitDiv.getBoundingClientRect().x + 'px'
  //     unitDiv.style.top = unitDiv.getBoundingClientRect().y + 'px'
  //
  //     // set new coordinates
  //     n.coordinates
  //   }
  //   // paintMap()
  // }
  //
  // place (c: ValidCoordinate): void {
  //   if ( this.currentMoves >= 1 && game.map.tileExists(c) ) {
  //     let targetTile = game.map.getTile(c)
  //     let hostTile = game.map.getTileByItemId(this.id)
  //     targetTile.units.push(this)
  //     hostTile.units.removeLast(this)
  //     this.currentMoves--
  //     if (this.currentMoves == 0) {
  //       this.status = status.outOfMoves
  //     }
  //     else {
  //       this.status = status.idle
  //     }
  //     paintMap()
  //   }
  // }
}

export default Unit

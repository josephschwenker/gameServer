import GameMap from './GameMap'
import Player from './Player'
import Piece from './Piece'
import List from './utility/List'
import Unit from './Unit'
import City from './City'
import Coordinate from './utility/TripleVector'
import Tile from './Tile'

class Game {
  private _nextId: number = 1
  get nextId (): number {
    return this._nextId++
  }

  private readonly map: GameMap
  // private activePiece: Piece | undefined
  // #nodeMap : NodeMap
  private turn: number = 0
  private units: List<Unit> = new List<Unit>()
  private cities: List<City> = new List<City>()
  private players: List<Player> = new List<Player>()

  constructor (
    size: number = 10,
    minLayer: number = -1,
    maxLayer: number = 1
  ) {
    // this.#nodeMap
    this.map = new GameMap(
      size,
      minLayer,
      maxLayer
    )
    // this.productionMenu = [StockpileMinerals, AdministrationNexus, Recycler, BiologyLab, PodSkimmer, ScoutSkimmer, EngineerSkimmer]
    // this.structures = [FlotationFarm, SolarArray]
    // add actions for all structures
    // for (let s of this.structures) {
    //   actions[s.shortName] = new Terraform(s)
    // }
  }

  start (): void {
    // choose starting locations for each player
  }

  addPlayer (player: Player): void {
    if (this.players.getById(player.id) === undefined) {
      throw new Error(`A player with the ID ${player.id} already exists.`)
    }
  }

  getCoordinatesOf (piece: Piece): Coordinate | undefined {
    if (piece !== undefined) {
      return this.map.getCoordinatesByItemId(piece.id)
    }
  }

  getTileYield (tile: Tile): Yield {
    return Object.values(tile.features)
      .map(
        (tileFeature) => tileFeature.yield
      )
      .reduce(
        (previous, current) => previous.add(current)
      )
  }

  // getUnitsAssignedTo (structure: Structure): List<Unit> {
  //   return this.units.filter(
  //     (u: Unit) => u.assignedTo === structure
  //   )
  // }
}

export default Game

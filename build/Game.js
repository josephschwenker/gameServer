"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameMap_1 = __importDefault(require("./GameMap"));
const List_1 = __importDefault(require("./utility/List"));
class Game {
    constructor(size = 10, minLayer = -1, maxLayer = 1) {
        this._nextId = 1;
        // #nodeMap : NodeMap
        this.turn = 0;
        this.units = new List_1.default();
        this.cities = new List_1.default();
        this.players = new List_1.default();
        // this.#nodeMap
        this.map = new GameMap_1.default(size, minLayer, maxLayer);
        // this.productionMenu = [StockpileMinerals, AdministrationNexus, Recycler, BiologyLab, PodSkimmer, ScoutSkimmer, EngineerSkimmer]
        // this.structures = [FlotationFarm, SolarArray]
        // add actions for all structures
        // for (let s of this.structures) {
        //   actions[s.shortName] = new Terraform(s)
        // }
    }
    get nextId() {
        return this._nextId++;
    }
    start() {
        // choose starting locations for each player
    }
    addPlayer(player) {
        if (this.players.getById(player.id) === undefined) {
            throw new Error(`A player with the ID ${player.id} already exists.`);
        }
    }
    getCoordinatesOf(piece) {
        if (piece !== undefined) {
            return this.map.getCoordinatesByItemId(piece.id);
        }
    }
    // getActiveTile (): Tile | undefined {
    //   const c = this.getCoordinatesOf(this.active)
    //   return this.map.getTile(c)
    // }
    getUnitsAssignedTo(structure) {
        return this.units.filter((u) => u.assignedTo === structure);
    }
}
exports.default = Game;

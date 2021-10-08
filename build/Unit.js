"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Fraction_1 = __importDefault(require("./Fraction"));
class Unit {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.attack = options.attack;
        this.defense = options.defense;
        this.moves = options.moves;
        this.paid = options.paid;
        this.health = options.health;
        this.upkeep = options.upkeep;
        this.status = options.status;
        this.available = options.available;
        this.modules = options.modules;
    }
    getDefaultName() {
        return `${this.modules.special.name} ${this.modules.equipment.name}`;
    }
    resetMoves() {
        this.moves = new Fraction_1.default(0, this.moves.denominator);
    }
}
exports.default = Unit;

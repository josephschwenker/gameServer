"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tile {
    constructor(options) {
        this.features = options.features;
        this.units = options.units;
        // store unfinished structures in structureQueue
        // this.structureQueue = null
        this.city = options.city;
    }
}
exports.default = Tile;

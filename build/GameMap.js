"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _GameMap_map;
Object.defineProperty(exports, "__esModule", { value: true });
const Tile_1 = __importDefault(require("./Tile"));
const OpenOcean_1 = __importDefault(require("./tileFeatures/terrain/OpenOcean"));
const FlotationFarm_1 = __importDefault(require("./tileFeatures/structures/FlotationFarm"));
class GameMap {
    constructor(size, minLayer, maxLayer) {
        _GameMap_map.set(this, void 0);
        this.size = size;
        this.minLayer = minLayer;
        this.maxLayer = maxLayer;
        __classPrivateFieldGet(this, _GameMap_map, "f")[0] =
            new Array(this.size)
                .fill(new Array(new Tile_1.default({
                terrain: OpenOcean_1.default,
                structure: FlotationFarm_1.default
            })));
    }
    getTile(c) {
        // check bounds
        if (__classPrivateFieldGet(this, _GameMap_map, "f")[c.z]) {
            if (__classPrivateFieldGet(this, _GameMap_map, "f")[c.z][c.y]) {
                return __classPrivateFieldGet(this, _GameMap_map, "f")[c.z][c.y][c.x];
            }
        }
        // not in bounds
        return undefined;
    }
    setTile(c, value) {
        // check bounds
        if (__classPrivateFieldGet(this, _GameMap_map, "f")[c.z] != undefined) {
            if (__classPrivateFieldGet(this, _GameMap_map, "f")[c.z][c.y] != undefined) {
                __classPrivateFieldGet(this, _GameMap_map, "f")[c.z][c.y][c.x] = value;
            }
        }
        // not in bounds
    }
    tileExists(c) {
        if (__classPrivateFieldGet(this, _GameMap_map, "f").getTile(c) != undefined) {
            return true;
        }
        else {
            return false;
        }
    }
    getNeighbors(c) {
        // returns an array of a tile's neighbors
        let neighbors = [];
        neighbors.push(new Tuple(c.x + 1, c.y, c.z));
        neighbors.push(new Tuple(c.x - 1, c.y, c.z));
        neighbors.push(new Tuple(c.x, c.y + 1, c.z));
        neighbors.push(new Tuple(c.x, c.y - 1, c.z));
        neighbors.push(new Tuple(c.x + 1, c.y + 1, c.z));
        neighbors.push(new Tuple(c.x - 1, c.y - 1, c.z));
        neighbors.push(new Tuple(c.x + 1, c.y - 1, c.z));
        neighbors.push(new Tuple(c.x - 1, c.y + 1, c.z));
        // remove any tiles that do not exist
        let validNeighbors = [];
        for (let n of neighbors) {
            if (__classPrivateFieldGet(this, _GameMap_map, "f").tileExists(n)) {
                validNeighbors.push(n);
            }
        }
        return validNeighbors;
    }
    getTileByItemId(id) {
        let c = __classPrivateFieldGet(this, _GameMap_map, "f").getCoordinatesByItemId(id);
        return __classPrivateFieldGet(this, _GameMap_map, "f").getTile(c);
    }
    getItemById(id) {
        let z = 0;
        for (let y = 0; y < __classPrivateFieldGet(this, _GameMap_map, "f").size; y++) {
            for (let x = 0; x < __classPrivateFieldGet(this, _GameMap_map, "f").size; x++) {
                let tile = __classPrivateFieldGet(this, _GameMap_map, "f").getTile(new Tuple(x, y, z));
                if (tile.units.length !== 0) {
                    for (let i = 0; i < tile.units.length; i++) {
                        if (tile.units[i].id == id) {
                            return tile.units[i];
                        }
                    }
                }
                if (tile.city !== undefined) {
                    if (tile.city.id == id) {
                        return tile.city;
                    }
                }
            }
        }
    }
    getCoordinatesByItemId(id) {
        let z = 0;
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let tile = __classPrivateFieldGet(this, _GameMap_map, "f").getTile(new Tuple(x, y, z));
                let units = tile.units;
                if (units.length !== 0) {
                    for (let i = 0; i < units.length; i++) {
                        if (units[i].id == id) {
                            return new Tuple(x, y, z);
                        }
                    }
                }
                let city = tile.city;
                if (city !== undefined) {
                    if (city.id === id) {
                        return new Tuple(x, y, z);
                    }
                }
            }
        }
    }
    getPath(nodeGraph, destination) {
        // follow predecessors
        let path = [];
        let previous = nodeGraph[destination];
        while (previous !== undefined) {
            path.push(previous);
            previous = previous.parent;
        }
        path.reverse();
        return path;
    }
    generateNodeGraph(source) {
        // yay, graph theory
        // create a map from tile coordinates to graph nodes
        let m = {};
        m[source] = new Node(source);
        m[source].distance = 0;
        m[source].turns = 0;
        let currentNode = m[source];
        // must store indices of nodes, not the nodes themselves
        let unvisited = new Set();
        unvisited.add(currentNode.coordinates);
        // prevent infinite loops
        let max = 9999;
        let ticks = 0;
        while (unvisited.size > 0 && ticks < max) {
            ticks++;
            if (ticks === max) {
                console.error('generateNodeGraph exceeded its maximum running time');
            }
            // mark this node as visited and remove it from the list of unvisited nodes
            currentNode.visited = true;
            unvisited.delete(currentNode.coordinates);
            if (unvisited.size > Math.pow(__classPrivateFieldGet(this, _GameMap_map, "f").size, 2)) {
                throw new Error('Too many nodes');
                break;
            }
            // get neighbors
            let neighbors = __classPrivateFieldGet(this, _GameMap_map, "f").getNeighbors(currentNode.coordinates);
            // calculate new distance
            let newDistance = currentNode.distance + 1;
            // add neighbors' distances to the hashmap
            for (let n of neighbors) {
                // add each neighbor to the hashmap if not already present
                if (m[n] == undefined) {
                    m[n] = new Node(n);
                }
                n = m[n];
                // check all unvisited neighbors
                if (!n.visited) {
                    let newTurns = currentNode.turns;
                    // calculate this neighbor's vector
                    let newVector = n.coordinates.subtract(currentNode.coordinates);
                    // calculate turns
                    if (currentNode.vector !== undefined) {
                        // parent has a vector, so check if it matches the new one
                        if (!newVector.equals(currentNode.vector)) {
                            // vectors do not equal, so increment turns
                            newTurns++;
                        }
                    }
                    if (newDistance < n.distance || (newDistance == n.distance && newTurns < n.turns)) {
                        // update distance
                        n.distance = newDistance;
                        // update turns
                        n.turns = newTurns;
                        // update vector
                        n.vector = newVector;
                        // update parent
                        n.parent = currentNode;
                    }
                    // add this node to the list of unvisited nodes
                    unvisited.add(n.coordinates);
                }
            }
            // choose the closest unvisited node for the next iteration
            let smallestDistance = Infinity;
            let smallestNode;
            for (let n of unvisited) {
                let candidateNode = m[n];
                if (candidateNode.distance < smallestDistance) {
                    smallestDistance = candidateNode.distance;
                    smallestNode = candidateNode;
                }
            }
            currentNode = smallestNode;
        }
        return m;
    }
}
_GameMap_map = new WeakMap();
exports.default = GameMap;

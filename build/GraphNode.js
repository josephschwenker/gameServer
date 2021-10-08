"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// GraphNode represents a node used for storing tile coordinates for pathfinding
class GraphNode {
    constructor(c) {
        this.visited = false;
        this.distance = Infinity;
        this.vector = undefined;
        this.turns = Infinity;
        this.parent = undefined;
        this.coordinates = c;
    }
    equals(node) {
        return this.coordinates === node.coordinates;
    }
}
exports.default = GraphNode;

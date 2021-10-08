"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TripleVector {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static parseVector(string) {
        const vector = string.split(',');
        const x = Number.parseInt(vector === null || vector === void 0 ? void 0 : vector[0]);
        const y = Number.parseInt(vector === null || vector === void 0 ? void 0 : vector[1]);
        const z = Number.parseInt(vector === null || vector === void 0 ? void 0 : vector[2]);
        if (x !== undefined && !isNaN(x) &&
            y !== undefined && !isNaN(y) &&
            z !== undefined && !isNaN(z)) {
            return new TripleVector(x, y, z);
        }
        else {
            return undefined;
        }
    }
    toString() {
        return `${this.x}, ${this.y}, ${this.z}`;
    }
    equals(vector) {
        if (this.x === vector.x &&
            this.y === vector.y &&
            this.z === vector.z) {
            return true;
        }
        else {
            return false;
        }
    }
    subtract(vector) {
        return new TripleVector(this.x - vector.x, this.y - vector.y, this.z - vector.z);
    }
}
exports.default = TripleVector;

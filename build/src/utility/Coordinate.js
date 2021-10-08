"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InvalidCoordinate_1 = __importDefault(require("./InvalidCoordinate"));
const ValidCoordinate_1 = __importDefault(require("./ValidCoordinate"));
function Coordinate(vector, map) {
    if (map.getTile(vector) === undefined) {
        return new InvalidCoordinate_1.default(vector.x, vector.y, vector.z);
    }
    else {
        return new ValidCoordinate_1.default(vector.x, vector.y, vector.z);
    }
}
exports.default = Coordinate;

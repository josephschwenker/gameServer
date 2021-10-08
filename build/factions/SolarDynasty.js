"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Faction_1 = __importDefault(require("./Faction"));
const SolarDynasty = new Faction_1.default({
    name: 'Solar Dynasty',
    color: 'red',
    cityNames: [
        'Final Unity',
        'Glorious Awakening',
        'Socialism Tunnels'
    ]
});
exports.default = SolarDynasty;

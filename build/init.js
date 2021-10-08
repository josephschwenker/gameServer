"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./server/routes"));
const Game_1 = __importDefault(require("./Game"));
const SolarDynasty_1 = __importDefault(require("./factions/SolarDynasty"));
const TerraSalvum_1 = __importDefault(require("./factions/TerraSalvum"));
const Player_1 = __importDefault(require("./Player"));
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const server = (0, express_1.default)();
(0, routes_1.default)(server);
server.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/`);
});
// start a new game
const game = new Game_1.default();
// add a player
game.addPlayer(new Player_1.default(game.nextId, 'Joseph', TerraSalvum_1.default));
game.addPlayer(new Player_1.default(2, 'AI', SolarDynasty_1.default));

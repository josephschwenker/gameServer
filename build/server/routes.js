"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const setRoutes = (server) => {
    // homepage
    server.get('/', (req, res) => {
        res.sendFile('index.html', {
            root: '../public'
        });
    });
    // /public
    server.use(express_1.default.static('../public'));
};
exports.default = setRoutes;

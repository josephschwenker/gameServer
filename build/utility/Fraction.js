"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fraction {
    constructor(numerator, denominator) {
        if (denominator === 0) {
            throw new Error('Cannot create fraction with a denominator of 0.');
        }
        this.numerator = numerator;
        this.denominator = denominator;
    }
}
exports.default = Fraction;

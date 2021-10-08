"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Engineer {
    constructor() {
        this.name = 'Engineer';
        this.cost = 20;
        this.attack = 0;
        this.defense = 0;
        this.moves = 3;
        this.health = 10;
        this.assignedTo = undefined;
        this.sound = 'sound/ship.wav';
        this.aggregateStatus = function () {
            let currentStructure = this.assignedTo;
            // calculate remaining moves if multiple units assigned
            let assignedUnits = game.getUnitsAssignedTo(this.assignedTo);
            let turnsLeft = this.assignedTo.constructor.buildTime - this.assignedTo.progress - assignedUnits.length + 1;
            // update all units' status
            for (let u of assignedUnits) {
                u.status = new EngineerStatus(u.assignedTo.constructor.fullName, turnsLeft, u.assignedTo.constructor.shortcut);
            }
        };
        this.advanceTerraform = function () {
            if (this.assignedTo != undefined) {
                // structure has not been completed
                this.assignedTo.progress++;
                // engineer forfeits all moves
                this.currentMoves = 0;
                // check if this structure has been completed
                if (this.assignedTo.progress >= this.assignedTo.constructor.buildTime) {
                    // structure completed
                    let t = game.map.getTileByItemId(this.id);
                    // check if structure is already present
                    if (t.structures.indexOf(this.assignedTo) == -1) {
                        // structure is not yet present
                        let oldStructure = t.structures.find(s => s instanceof Structure);
                        if (oldStructure != undefined) {
                            // remove pre-existing structure if present
                            t.structures.removeLast(oldStructure);
                        }
                        t.structures.push(this.assignedTo);
                        // remove this structure from the production queue
                        t.structureQueue.removeLast(this.assignedTo);
                    }
                    // remove unit from assignment
                    this.assignedTo = undefined;
                    // change unit status to idle
                    this.status = status.idle;
                    // play sound
                    play('sound/CPU terraform complete.wav');
                }
                else {
                    // structure is still in progress
                    // update status
                    this.aggregateStatus();
                }
            }
        };
    }
}
exports.default = Engineer;

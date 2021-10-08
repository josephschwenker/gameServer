'use strict';
class Terraform extends Action {
  constructor(structure) {
    super();
    this.name = structure.fullName;
    this.shortcut = structure.shortcut;
    this.structure = structure;
    // bind 'this' so the function works when attached to an event handler
    this.do = this.do.bind(this);
  }

  isAvailable = function () {
    if (game.active instanceof EngineerSkimmer) {
      if (game.active.currentMoves > 0 && game.structures.includes(this.structure)) {
        return true;
      }
      else if (game.active.currentMoves <= 0) {
        return false;
      }
      else if (!game.structures.includes(this.structure)) {
        return false;
      }
    }
    else {
      return false;
    }
  };

  do = function () {
    if (this.isAvailable()) {
      // unit has at least one move left
      let t = game.getActiveTile();
      if (t.structures.find(s => s instanceof this.structure) != undefined) {
        // this structure already exists
        // play sound
        play('sound/cpu improved already.wav');
      }
      else {
        // this structure has not yet been built, check if in progress
        let currentStructure = t.structureQueue.find(s => s instanceof this.structure);
        if (currentStructure == undefined) {
          // no one has started building this structure
          currentStructure = new this.structure(game.getCoordinatesOf(game.active));
          // add new structure to production queue
          t.structureQueue.push(currentStructure);
        }
        // assign this engineer to the structure
        game.active.assignedTo = currentStructure;
        // update statuses of all units, aggregating engineer-turns
        game.active.aggregateStatus();
        // re-render to show engineer status
        paintMap();
      }
    }
    else {
      play(INVALID_COMMAND);
    }
  };
}

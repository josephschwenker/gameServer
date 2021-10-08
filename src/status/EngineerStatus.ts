'use strict';
class EngineerStatus extends Status {
  constructor(fullName, turnsLeft, abbreviation) {
    super(fullName, turnsLeft, abbreviation);
    this.fullName = 'constructing ' + fullName + ' (' + turnsLeft + ' turns left)';
    this.abbreviation = abbreviation;
  }
}

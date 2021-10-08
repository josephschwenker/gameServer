import EquipmentModule from './EquipmentModule'

class Scout implements EquipmentModule {
  name = 'Scout'
  cost = 10
  attack = 0
  defense = 0
  moves = 6
  health = 10
  sound = 'sound/ship.wav'
}

export default Scout

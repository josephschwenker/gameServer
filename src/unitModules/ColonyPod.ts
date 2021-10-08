import EquipmentModule from './EquipmentModule'

abstract class ColonyPod implements EquipmentModule {
  name = 'Colony Pod'
  cost = 10
  attack = 0
  defense = 0
  moves = 3
  health = 10
  sound = 'sound/ship.wav'
}

export default ColonyPod

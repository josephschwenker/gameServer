import Structure from '../Structure.js'

class FlotationFarm implements Structure {
  name = 'Flotation Farm'
  id: number
  cost = 9
  shortcut = 'f'

  constructor (id: number) {
    this.id = id
  }
}

export default FlotationFarm

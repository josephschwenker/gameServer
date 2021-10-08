import Searchable from '../utility/Searchable'

interface Facility extends Searchable {
  id: number
  name: string
  cost: number
  paid: number
  available: boolean
  upkeep: number
}

export default Facility

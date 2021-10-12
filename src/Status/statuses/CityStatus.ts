import Fraction from '../../utility/Fraction'
import Status from '../Status'

class CityStatus extends Status {
  constructor (options) {
    super(
      {
        name: `Constructing ${options.name}`,
        completed: options.completed,
        willAdd: options.willAdd,
        icon: options.icon
      }
    )
  }
}

export default CityStatus

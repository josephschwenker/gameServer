import Fraction from '../../../utility/Fraction'
import Command from '../../Command'

class CityStatus extends Command {
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

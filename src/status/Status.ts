import Fraction from '../utility/Fraction'

abstract class Status {
  name: string
  completed: Fraction
  willAdd: number
  icon: string

  constructor (
    options: {
      name: string
      completed: Fraction
      willAdd: number
      icon: string
    }
  ) {
    this.name = options.name
    this.completed = options.completed
    this.willAdd = options.willAdd
    this.icon = options.icon
  }

  turnsLeft (): string {
    const turnsLeft = (this.completed.denominator - this.completed.numerator) / this.willAdd
    return turnsLeft === Infinity ? '∞' : turnsLeft.toString()
  }

  getStatus (): string {
    return `${this.name} (${this.turnsLeft()} turns)`
  }
}

export default Status

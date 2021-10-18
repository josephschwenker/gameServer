import Fraction from './Fraction'

class Progress {
  current: Fraction
  willAdd: number
  constructor (current: Fraction, willAdd: number) {
    this.current = current
    this.willAdd = willAdd
  }

  remainingTurns (): number {
    return Math.min(
      (this.current.denominator - this.current.numerator) / this.willAdd,
      1
    )
  }
}

export default Progress

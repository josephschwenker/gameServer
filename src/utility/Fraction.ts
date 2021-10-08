class Fraction {
  readonly numerator: number
  readonly denominator: number

  constructor (numerator: number, denominator: number) {
    if (denominator === 0) {
      throw new Error('Cannot create fraction with a denominator of 0.')
    }
    this.numerator = numerator
    this.denominator = denominator
  }
}

export default Fraction

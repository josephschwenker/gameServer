class Yield {
  food: number
  minerals: number

  constructor (
    options: {
      food: number
      minerals: number
    }
  ) {
    this.food = options.food
    this.minerals = options.minerals
  }

  add (other: Yield): Yield {
    return new Yield(
      {
        food: this.food + other.food,
        minerals: this.minerals + other.minerals
      }
    )
  }
}

export default Yield

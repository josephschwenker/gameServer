class TripleVector {
  readonly x: number
  readonly y: number
  readonly z: number
  constructor (x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  static parseVector (string: string): TripleVector | undefined {
    const vector = string.split(',')
    const x = Number.parseInt(vector?.[0])
    const y = Number.parseInt(vector?.[1])
    const z = Number.parseInt(vector?.[2])
    if (
      x !== undefined && !isNaN(x) &&
      y !== undefined && !isNaN(y) &&
      z !== undefined && !isNaN(z)
    ) {
      return new TripleVector(x, y, z)
    } else {
      return undefined
    }
  }

  toString (): string {
    return `${this.x}, ${this.y}, ${this.z}`
  }

  equals (vector: TripleVector): boolean {
    if (
      this.x === vector.x &&
      this.y === vector.y &&
      this.z === vector.z
    ) {
      return true
    } else {
      return false
    }
  }

  subtract (vector: TripleVector): TripleVector {
    return new TripleVector(
      this.x - vector.x,
      this.y - vector.y,
      this.z - vector.z
    )
  }
}

export default TripleVector

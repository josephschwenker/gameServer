import Searchable from './Searchable'

class List<T extends Searchable> {
  constructor (list?: T[]) {
    if (list === undefined) {
      this.#list = new Array<T>()
    } else {
      this.#list = [...list]
    }
  }

  #list: T[]

  add (item: T): void {
    this.#list.push(item)
  }

  getById (id: number): T | undefined {
    return this.#list.find(
      (item) => item.id === id
    )
  }

  filter (f: Function): List<T> {
    return new List<T>(
      this.#list.filter(
        (T) => Boolean
      )
    )
  }
}

export default List

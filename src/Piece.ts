import Searchable from './utility/Searchable'
import Status from './status/Status'
import Player from './Player'

interface Piece extends Searchable {
  name: string
  readonly id: number
  readonly status: Status[]
  owner: Player
}

export default Piece

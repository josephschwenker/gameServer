import Yield from '../../Yield.js'
import Terrain from '../Terrain.js'

const OpenOcean = new Terrain(
  {
    yield: new Yield(
      {
        food: 1,
        minerals: 0
      }
    )
  }
)

export default OpenOcean

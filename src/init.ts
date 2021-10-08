import express from 'express'
import setRoutes from './server/routes'
import Game from './Game'
import SolarDynasty from './factions/SolarDynasty'
import TerraSalvum from './factions/TerraSalvum'
import Player from './Player'

const PORT = process.env.PORT ?? 5000

const server = express()

setRoutes(server)

server.listen(
  PORT,
  () => {
    console.log(
      `Server started at http://localhost:${PORT}/`
    )
  }
)

// start a new game
const game: Game = new Game()

// add a player
game.addPlayer(
  new Player(
    game.nextId,
    'Joseph',
    TerraSalvum
  )
)

game.addPlayer(
  new Player(
    2,
    'AI',
    SolarDynasty
  )
)

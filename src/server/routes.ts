import express from 'express'
import * as core from 'express-serve-static-core'

const setRoutes = (server: core.Express): void => {
  // homepage
  server.get(
    '/',
    (req: core.Request, res: core.Response) => {
      res.sendFile(
        'index.html',
        {
          root: '../public'
        }
      )
    }
  )

  // /public
  server.use(
    express.static(
      '../public'
    )
  )
}

export default setRoutes

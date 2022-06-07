import express from 'express'
import cors from 'cors'
import adsController from './controllers/ads.controller'

export const initExpressServer = () => {
  const app = express()
  const port = 3000

  app.use(cors())

  app.get('/:typeOperation/:from/:to/:amount', adsController)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

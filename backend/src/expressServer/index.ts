import express from 'express'
import cors from 'cors'

import adsController from './controllers/ads.controller'

export const initExpressServer = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.get('/hi', (req, res) => res.json({ hello: 'hello' }))
  app.post('/getBestAds', adsController)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

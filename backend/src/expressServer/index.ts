import express from 'express'
import cors from 'cors'
import adsController from './controllers/ads.controller'

export const initExpressServer = () => {
  const app = express()
  const port = process.env.PORT || 3000

  app.use(cors())
  app.get('/hi', (req, res) => res.json({ hello: 'hello' }))
  app.get('/:typeOperation/:from/:to/:amount', adsController)

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

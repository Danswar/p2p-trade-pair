import express from 'express'
import adsController from './controllers/ads.controller'

const app = express()
const port = 3000

app.get('/:from/:to', adsController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
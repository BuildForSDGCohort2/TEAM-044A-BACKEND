import express from 'express'
// import setupDB from '../database'
import usersDb from '../users/model'
import { cronTest } from '../core-payment/use-cases'

const app = express()

// setupDB('mongodb://localhost:27017,localhost:27018,localhost:27019', 'escrow')
// setupDB(
//   'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019',
//   'escrow?replicaSet=rs'
// )

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async (req, res, next) => {
  const user = await usersDb.findById({ id: '5f3fbbe9eaeeae091841cd71' })

  req.user = user
  next()
})
require('../routes')(app)

cronTest.start()

module.exports = app

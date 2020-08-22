import express from 'express'
// import setupDB from '../database'
import usersDb from '../users/model'

const app = express()

// setupDB('mongodb://localhost:27017,localhost:27018,localhost:27019', 'escrow')
// setupDB(
//   'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019',
//   'escrow?replicaSet=rs'
// )

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(async (req, res, next) => {
  const user = await usersDb.findById({ id: '5f3d7edd899eb112a8b444ca' })

  req.user = user
  next()
})
require('../routes')(app)

module.exports = app

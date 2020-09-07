import express from 'express'
import cors from 'cors'
import path from 'path'
import setupDB from '../database'
import usersDb from '../users/model'
import subscriber from '../pubsub/subscriber'

const app = express()

// setupDB('mongodb://localhost:27017,localhost:27018,localhost:27019', 'escrow')
// setupDB(
//   'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019',
//   'escrow?replicaSet=rs'
// )

setupDB()
subscriber()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Initiator
app.use(async (req, res, next) => {
  const user = await usersDb.findById({ id: '5f4fd5b0d9f81a072c337b48' })
  req.user = user
  next()
})

// Recipient
// app.use(async (req, res, next) => {
//   const user = await usersDb.findById({ id: '5f460a421ff47031a02f4775' })
//   req.user = user
//   next()
// })

app.get('/', (_, res) => res.json({ msg: 'MoneyGuard is Protectinggg.' }))
app.get('/:ref', (req, res) => {
  res.sendFile(path.join(__dirname, './pay.html'))
})

require('../routes')(app)

module.exports = app

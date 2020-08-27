import express from 'express'
// import setupDB from '../database'
import path from 'path'
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

//Initiator
app.use(async (req, res, next) => {
  const user = await usersDb.findById({ id: '5f4606f0122cc53160eb0810' })
  req.user = user
  next()
})

// Recipient
// app.use(async (req, res, next) => {
//   const user = await usersDb.findById({ id: '5f460a421ff47031a02f4775' })
//   req.user = user
//   next()
// })

app.get('/', (_, res) => res.json({ msg: 'Hello' }))
app.get('/:ref', (req, res) => {
  // res.json({ hello: 'hellooo' })
  res.sendFile(path.join(__dirname, './pay.html'))
})
require('../routes')(app)

// cronTest.start()

module.exports = app

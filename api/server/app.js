/* eslint-disable no-unused-expressions */
import express from 'express'
import cors from 'cors'
import path from 'path'
import setupDB from '../database'

const app = express()

setupDB()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Credentials', true)
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept, x-auth-token, Authorization'
  )
  next()
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.json({ msg: 'MoneyGuard is Protectinggg.' }))
app.get('/:ref', (req, res) => {
  res.sendFile(path.join(__dirname, './pay.html'))
})

require('../routes')(app)

module.exports = app

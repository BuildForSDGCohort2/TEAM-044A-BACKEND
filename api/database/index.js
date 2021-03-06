/* eslint-disable consistent-return */
/* eslint-disable no-console */
import mongoose from 'mongoose'

process.env.NODE_ENV = 'dev'

const url =
  process.env.DB_URL ||
  'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs'
const setupDB = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      replicaSet: 'rs'
    })
    console.log(`Connected to ${url}`)
  } catch (e) {
    return console.log(e)
  }
}

export default setupDB

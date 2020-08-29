/* eslint-disable consistent-return */
/* eslint-disable no-console */
import mongoose from 'mongoose'

const setupDB = async (uri, dbUrl) => {
  try {
    await mongoose.connect(`${uri}/${dbUrl}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      replicaSet: 'rs'
    })
    console.log('Connected')
  } catch (e) {
    return console.log(e)
  }
}

// mongoose
//   .connect(
//     `mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs`,
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       replicaSet: 'rs'
//     }
//   )
//   .then(() => {
//     console.log('Connected')
//   })
//   .catch((e) => console.log(e))
export default setupDB

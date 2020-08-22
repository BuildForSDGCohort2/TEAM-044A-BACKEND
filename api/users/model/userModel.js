// import { Schema, Types, model } from 'mongoose'
import mongoose from '../../database'

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  dob: {
    type: Date,
    default: Date.now()
  },
  createdOn: {
    type: Date
  },
  modifiedOn: {
    type: Date
  },
  balance: {
    type: Number,
    default: 20000
  },

  transactions: [{ type: mongoose.Types.ObjectId, ref: 'Transaction' }],
  source: {}
})

const User = mongoose.model('User', userSchema)
// export default userSchema
export default User

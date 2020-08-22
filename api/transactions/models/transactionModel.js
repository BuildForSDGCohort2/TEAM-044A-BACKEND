// import { Schema, model } from 'mongoose'
import moment from 'moment'
import mongoose from '../../database/index'

const transactionSchema = new mongoose.Schema({
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
  emailVerified: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String,
    required: true
  },

  transactionTitle: {
    type: String,
    required: true
  },

  transactionDesc: {
    type: String,
    required: true
  },

  currency: {
    type: String,
    enum: ['Naira', 'GHS']
  },

  inspectionPeriod: {
    type: Date,
    required: true
  },

  dueDate: {
    type: Date,
    required: true
  },

  reference: {
    type: String,
    required: true
  },

  dateCreated: {
    type: Date,
    default: moment().valueOf()
  },
  transactionStatus: {
    type: String,
    enum: ['Awaiting Confirmation', 'Ongoing', 'Completed', 'cancelled'],
    default: 'Awaiting Confirmation'
  },
  amount: { type: Number, required: true },
  source: {}
})

const Transaction = mongoose.model('Transaction', transactionSchema)
// export default transactionSchema
export default Transaction

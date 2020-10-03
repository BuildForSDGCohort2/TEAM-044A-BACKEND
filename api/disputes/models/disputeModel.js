// import mongoose from '../../database'
import mongoose from 'mongoose'

const disputeSchema = new mongoose.Schema({
  transactionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Transaction'
  },

  decision: {
    type: String
  },

  disputeStatus: {
    type: String,
    enum: ['Open', 'Resolved'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  initiatorId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  }
})

export default disputeSchema

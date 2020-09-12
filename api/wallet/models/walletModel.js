import { Schema, Types } from 'mongoose'

const walletSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    default: 0,
    required: true
  },
  walletTransactions: [
    { type: Types.ObjectId, ref: 'WalletTransaction', required: true }
  ]
})

export default walletSchema

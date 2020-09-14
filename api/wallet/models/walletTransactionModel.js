import { Schema, Types } from 'mongoose'

const types = ['deposit', 'withdraw', 'transfer', 'fee']
const walletTransactionSchema = new Schema({
  amount: {
    type: Number,
    default: 0,
    required: true
  },
  reference: {
    type: String
  },
  operationType: {
    type: String,
    required: true,
    enum: types
  },
  userId: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  destinationWalletId: {
    type: Types.ObjectId,
    ref: 'User'
  },
  createdAt: { type: Date }
})

export default walletTransactionSchema

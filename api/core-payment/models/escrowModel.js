import mongoose from 'mongoose'
// import mongoose from '../../database/index'

const escrowSchema = new mongoose.Schema({
  totalAmount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  buyerId: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  transactionId: {
    type: mongoose.Types.ObjectId,
    ref: 'Transaction'
  },
  escrowCharge: {
    type: Number,
    required: true
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paymentMadeAt: {
    type: Date,
    default: Date.now()
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  isCustomerPaid: {
    type: Boolean,
    default: false
  }
})
export default escrowSchema

// import { Schema, Types, model } from 'mongoose'
import mongoose from '../../database/index'

const escrowSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  buyerInfo: {
    buyerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    email: String
  },
  sellerInfo: {
    sellerId: {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    },
    email: String
  },
  // inspectionPeriod: {
  //   numOfDays: {
  //     type: Types.ObjectId,
  //     ref: 'Transaction'
  //   },
  //   inspectionDays: Number
  // },
  // dueDate: {
  //   date: {
  //     type: Types.ObjectId,
  //     ref: 'Transaction'
  //   },
  //   dueDate: Number
  // },
  currentTransaction: {
    transaction: {
      type: mongoose.Types.ObjectId,
      ref: 'Transaction'
    }
  }
})
const Escrow = mongoose.model('Escrow', escrowSchema)
export default Escrow
// export default escrowSchema

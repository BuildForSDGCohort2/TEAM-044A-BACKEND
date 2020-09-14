import mongoose from 'mongoose'
import userSchema from '../users/model/userModel'
import transactionSchema from '../transactions/models/transactionModel'
import escrowSchema from '../core-payment/models/escrowModel'
import disputeSchema from '../disputes/models/disputeModel'
import walletSchema from '../wallet/models/walletModel'
import walletTransactionSchema from '../wallet/models/walletTransactionModel'

const models = {
  User: mongoose.model('User', userSchema),
  Transaction: mongoose.model('Transaction', transactionSchema),
  Escrow: mongoose.model('Escrow', escrowSchema),
  Dispute: mongoose.model('Dispute', disputeSchema),
  Wallet: mongoose.model('Wallet', walletSchema),
  WalletTransaction: mongoose.model(
    'WalletTransaction',
    walletTransactionSchema
  )
}

Object.values(models).forEach((model) => {
  if (!model) {
    model.createCollection()
  }
})

export default models

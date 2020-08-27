import makeCreateTransaction from './createTransaction'
import makeListTransactions from './list-transactions'
import makeAcceptTransaction from './acceptTransaction'
import makeRejectDeliveredTransaction from './rejectDeliveredTransaction'
import makeDeliveryComplete from './deliveryComplete'
import makeConfirmTransaction from './confirmTransaction'
import makeInProgress from './inProgress'
import makeRejectTransactionRequest from './rejectTransactionRequest'
import {
  sendAcceptanceEmail,
  sendRejectionMail,
  sendDeliveryEmail,
  sendConfirmEmail,
  sendTransactionMail,
  sendInProgressEmail,
  sendDeliveryRejectionEmail
} from '../../mail'
import transactionDb from '../models'
import usersDb from '../../users/model'

const createTransaction = makeCreateTransaction({
  transactionDb,
  sendTransactionMail
})

// list transactions
const listTransactions = makeListTransactions({ transactionDb })

// recipient/seller accepts transactions
const acceptTransaction = makeAcceptTransaction({
  transactionDb,
  usersDb,
  sendAcceptanceEmail
})

// Rejects delivered product/service
const rejectDeliveredTransaction = makeRejectDeliveredTransaction({
  transactionDb,
  usersDb,
  sendDeliveryRejectionEmail
})

// Rejects initial transaction request
const rejectTransactionRequest = makeRejectTransactionRequest({
  transactionDb,
  usersDb,
  sendRejectionMail
})

// recipient/seller marks delivery as completed
const deliveryComplete = makeDeliveryComplete({
  transactionDb,
  sendDeliveryEmail
})

// buyer/initiator confirms the delivery of shipped product/service
const confirmTransaction = makeConfirmTransaction({
  transactionDb,
  sendConfirmEmail
})

// marks transaction status to be in progress
const inProgress = makeInProgress({
  transactionDb,
  sendInProgressEmail,
  usersDb
})

export {
  listTransactions,
  createTransaction,
  acceptTransaction,
  rejectDeliveredTransaction,
  rejectTransactionRequest,
  deliveryComplete,
  confirmTransaction,
  inProgress
}

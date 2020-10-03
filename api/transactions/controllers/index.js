import makePostTransaction from './post-transaction'
import makeGetTransactions from './get-transactions'
import makePostAcceptTransaction from './accept-transaction'
import makePostRejectTransaction from './postRejectTransaction'
import makePostDeliveryTransaction from './postDeliveryTransaction'
import makePostConfirmTransaction from './postConfirmTransaction'
import makePostInProgress from './postInProgress'
import makePostRejectDeliveredTransaction from './postRejectDelivery'
import makePostVerifyTransaction from './postVerifyFunds'
import {
  listTransactions,
  createTransaction,
  acceptTransaction,
  rejectTransactionRequest,
  rejectDeliveredTransaction,
  deliveryComplete,
  confirmTransaction,
  inProgress,
  verifyTransaction
} from '../use-cases'

const postTransaction = makePostTransaction({ createTransaction })
const getTransactions = makeGetTransactions({ listTransactions })
const postAcceptTransaction = makePostAcceptTransaction({ acceptTransaction })
const rejectTransactions = makePostRejectTransaction({
  rejectTransactionRequest
})
const postDeliverTransaction = makePostDeliveryTransaction({ deliveryComplete })
const postConfirmTransaction = makePostConfirmTransaction({
  confirmTransaction
})
const postRejectDelivery = makePostRejectDeliveredTransaction({
  rejectDeliveredTransaction
})

const postInProgress = makePostInProgress({ inProgress })

const verifyPaystack = makePostVerifyTransaction({ verifyTransaction })
export {
  postTransaction,
  verifyPaystack,
  getTransactions,
  postAcceptTransaction,
  rejectTransactions,
  postDeliverTransaction,
  postConfirmTransaction,
  postInProgress,
  postRejectDelivery
}

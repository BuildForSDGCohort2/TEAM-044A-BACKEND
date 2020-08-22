import makePostTransaction from './post-transaction'
import makeGetTransactions from './get-transactions'
import makePostAcceptTransaction from './accept-transaction'
import {
  listTransactions,
  createTransaction,
  acceptTransaction
} from '../use-cases'

const postTransaction = makePostTransaction({ createTransaction })
const getTransactions = makeGetTransactions({ listTransactions })
const postAcceptTransaction = makePostAcceptTransaction({ acceptTransaction })
export { postTransaction, getTransactions, postAcceptTransaction }

import makeCreateTransaction from './createTransaction'
import buildMakeSendTransaction from './send-transaction'
import makeListTransactions from './list-transactions'
import makeAcceptTransaction from './acceptTransaction'
import { sendAcceptanceEmail } from '../../mail'
import sendMail from '../../mail/sendMail'
import {
  getTransactionEmailURL,
  transactionEmailTemplate
} from '../../helpers/email'
import transactionDb from '../models'
import usersDb from '../../users/model'
import { createToken } from '../../helpers/jsonwt'

const sendTransaction = buildMakeSendTransaction({
  transactionDb,
  usersDb,
  createToken,
  sendMail,
  getTransactionEmailURL,
  transactionEmailTemplate
})
const createTransaction = makeCreateTransaction({
  transactionDb,
  sendTransaction
})

const listTransactions = makeListTransactions({ transactionDb })
const acceptTransaction = makeAcceptTransaction({
  transactionDb,
  sendAcceptanceEmail
})

export { listTransactions, createTransaction, acceptTransaction }

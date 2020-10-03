import makeTransactionsDb from './transactionDb'
import models from '../../database/models'
// import usersDb from '../../users/model'

const { User, Transaction, Escrow, Dispute } = models

const transactionDb = makeTransactionsDb({ User, Dispute, Transaction, Escrow })
export default transactionDb

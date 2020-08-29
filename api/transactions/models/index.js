import makeTransactionsDb from './transactionDb'
import models from '../../database/models'
// import usersDb from '../../users/model'

const { User, Transaction, Escrow } = models

const transactionDb = makeTransactionsDb({ User, Transaction, Escrow })
export default transactionDb

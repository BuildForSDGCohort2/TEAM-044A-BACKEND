import makeTransactionsDb from './transactionDb'
import models from '../../database/models'
// import usersDb from '../../users/model'

const { Transaction, User, Escrow } = models

const transactionDb = makeTransactionsDb({ Transaction, User, Escrow })
export default transactionDb

import makeTransactionsDb from './transactionDb'
// import models from '../../database/models'
import usersDb from '../../users/model'
import Transaction from './transactionModel'
import User from '../../users/model/userModel'
import Escrow from '../../core-payment/models/escrowModel'

// const { Transaction, User, Escrow } = models

const transactionDb = makeTransactionsDb({ Transaction, usersDb, User, Escrow })
export default transactionDb

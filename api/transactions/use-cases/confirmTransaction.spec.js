import { sendConfirmEmail } from '../../mail/index'
import setupDB from '../../test/db'
import makeConfirmTransaction from './confirmTransaction'
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeTransactionDb from '../models/transactionDb'
import usersDb from '../../users/model'
import User from '../../users/model/userModel'
import Transaction from '../models/transactionModel'
import Escrow from '../../core-payment/models/escrowModel'
import makeFakeUser from '../../test/fixtures/user'

jest.setTimeout(30000)
setupDB('escrow-test')
let transactionDb
beforeAll(() => {
  transactionDb = makeTransactionDb({ Transaction, usersDb, User, Escrow })
})
describe('Confirms a transaction', () => {
  it('marks transaction as confirmed', async () => {
    const user = makeFakeUser({ _id: '5f3fbbe9eaeeae091841cd71' })
    const transactions = makeFakeTransaction()
    const ref = transactions.reference
    const confirmTransaction = makeConfirmTransaction({
      transactionDb,
      sendConfirmEmail
    })
    const toTest = await confirmTransaction({ ref, user })
    expect(toTest.transactionStatus).toBe('Buyer confirmed Order')
  })
})

// import { sendConfirmEmail } from '../../mail/index'
import setupDB from '../../test/db'
import makeConfirmTransaction from './confirmTransaction'
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeTransactionDb from '../models/transactionDb'
import makeFakeUser from '../../test/fixtures/user'
import models from '../../database/models'
import makeUsersDb from '../../users/model/usersDb'
import { createToken } from '../../helpers/jsonwt'

const { Transaction, User, Escrow } = models

jest.setTimeout(30000)
setupDB('escrow-test')
let transactionDb
let usersDb

beforeAll(() => {
  transactionDb = makeTransactionDb({ Transaction, User, Escrow })
  usersDb = makeUsersDb({ User, createToken })
})
describe('Confirms a transaction', () => {
  it('marks transaction as confirmed', async () => {
    const newuser = makeFakeUser()
    const user = await usersDb.insert(newuser)
    const transactions = makeFakeTransaction({ user: { id: user?.user?._id } })
    const inserted = await transactionDb.insert(transactions)
    const ref = inserted.reference
    const confirmTransaction = makeConfirmTransaction({
      transactionDb,
      sendConfirmEmail: () => {}
    })
    const found = await confirmTransaction({ ref })
    expect(found.transactionStatus).toBe('Buyer confirmed Order')
  })
})

/* eslint-disable no-console */
/* eslint-disable no-undef */
import makeCreateTransaction from './createTransaction'
import makeTransactionsDb from '../models/transactionDb'
import Transaction from '../models/transactionModel'
import makeFakeTransaction from '../../test/fixtures/transaction'
import setupDB from '../../test/db'
import makeFakeUser from '../../test/fixtures/user'

setupDB('transactions')

let transactionDb
beforeAll(() => {
  transactionDb = makeTransactionsDb({ Transaction })
})

describe('Create Transaction', () => {
  it('adds a transaction to the db', async () => {
    const transactionInfo = makeFakeTransaction()
    const user = makeFakeUser()
    const createTransaction = makeCreateTransaction({
      transactionDb,
      sendTransaction: () => {}
    })
    const inserted = await createTransaction({ ...transactionInfo, user })
    console.log('INSERTED', inserted)
    expect(inserted).toBeDefined()
  })
})

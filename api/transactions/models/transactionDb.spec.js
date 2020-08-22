/* eslint-disable no-undef */
import Transaction from './transactionModel'
import setupDB from '../../test/db'
import makeTransactionsDb from './transactionDb'
import makeFakeTransaction from '../../test/fixtures/transaction'

setupDB('transactions')
let transactionDb

beforeAll(() => {
  transactionDb = makeTransactionsDb({ Transaction })
})

describe('Transactions Db', () => {
  it('adds a transaction', async () => {
    const transaction = makeFakeTransaction()
    const toInsert = await transactionDb.insert(transaction)
    expect(toInsert).toEqual(transaction)
  })

  it('finds a transaction by id', async () => {
    const transaction = makeFakeTransaction()
    await transactionDb.insert(transaction)
    const found = await transactionDb.findById(transaction)
    expect(found).not.toBeNull()
  })

  it('removes a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionDb.insert(transaction)
    const found = await transactionDb.findById(transaction)
    expect(found).not.toBeNull()
    const toRemove = await transactionDb.remove(found)
    expect(toRemove).toBeNull()
  })

  it('updates a transaction', async () => {
    const transaction = makeFakeTransaction()
    await transactionDb.insert(transaction)
    transaction.firstName = 'King iyosayi'
    expect(transaction.firstName).toBe('King iyosayi')
  })
})

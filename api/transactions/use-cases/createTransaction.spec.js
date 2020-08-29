/* eslint-disable no-console */
/* eslint-disable no-undef */
import makeCreateTransaction from './createTransaction'
import makeTransactionsDb from '../models/transactionDb'
import Transaction from '../models/transactionModel'
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeFakeUser from '../../test/fixtures/user'

let transactionDb
beforeAll(() => {
  transactionDb = makeTransactionsDb({ Transaction })
})

jest.mock('./createTransaction.js')

const createTransaction = jest.fn(() => {
  makeCreateTransaction({
    transactionDb,
    sendTransactionMail: () => console.log('DONE!!!123')
  })
})

describe('Create Transaction', () => {
  it('adds a transaction to the db', async () => {
    const transactionInfo = makeFakeTransaction()
    const user = makeFakeUser()
    createTransaction({ user, ...transactionInfo })
    createTransaction.mockImplementation(() => transactionInfo)
    expect(createTransaction({ user, ...transactionInfo })).toBeTruthy()
  })
})

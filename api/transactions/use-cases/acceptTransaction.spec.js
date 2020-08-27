/* eslint-disable no-undef */
import makeTransactionSDb from '../models/transactionDb'
import sendAcceptanceEmail from '../../mail'
import makeFakeUser from '../../test/fixtures/user'
import makeFakeTransaction from '../../test/fixtures/transaction'
import setupDB from '../../test/db'
import models from '../../database/models'
import makesAcceptTransaction from './acceptTransaction'

const { Transaction } = models

setupDB('escrow-test')

let transactionDb
beforeAll(() => {
  transactionDb = makeTransactionSDb({ Transaction })
})

describe('Accept Transaction', () => {
  it('marks transaction status as Ongoing', async () => {
    const transaction = makeFakeTransaction()
    const ref = await transactionDb.findByRef({ ref: transaction.reference })
    const user = makeFakeUser()
    const acceptTransaction = makesAcceptTransaction({
      transactionDb,
      sendAcceptanceEmail
    })
    const toTest = await acceptTransaction({ user, ref })
    expect(toTest).toBeDefined()
    expect(transaction.transactionStatus).toBe('Transaction')
  })
})

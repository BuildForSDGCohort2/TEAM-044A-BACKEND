import makeTransactionDb from '../models/transactionDb'
import makeFakeUser from '../../test/fixtures/user'
import makeFakeTransaction from '../../test/fixtures/transaction'
import setupDB from '../../test/db'
import models from '../../database/models'
import makeUsersDb from '../../users/model/usersDb'
import { createToken } from '../../helpers/jsonwt'
import makeDeliveryComplete from './deliveryComplete'

const { Transaction, User, Escrow } = models

setupDB('transactions')

let transactionDb
let usersDb

beforeAll(() => {
  usersDb = makeUsersDb({ User, createToken })
  transactionDb = makeTransactionDb({ User, Transaction, Escrow })
})

describe('Deliver Status', () => {
  it('marks an order as deliverd', async () => {
    const newuser = makeFakeUser()
    const user = await usersDb.insert(newuser)
    const newtransaction = makeFakeTransaction({
      user: { id: user?.user?._id }
    })
    const transaction = await transactionDb.insert(newtransaction)
    const ref = transaction.reference
    const deliveryComplete = makeDeliveryComplete({
      transactionDb,
      sendDeliveryEmail: () => {}
    })
    const found = await deliveryComplete({ ref })
    expect(found.transactionStatus).toBe('Delivered')
  })
})

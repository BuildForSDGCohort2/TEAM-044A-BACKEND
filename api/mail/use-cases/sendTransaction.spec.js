/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import makeFakeTransaction from '../../test/fixtures/transaction'
import makeFakeUser from '../../test/fixtures/user'
import sendMail from '../sendMail'
import {
  getTransactionEmailURL,
  transactionEmailTemplate
} from '../../helpers/email'
import buildMakeSendTransaction from './send-transaction'
import Transaction from '../../transactions/models/transactionModel'
import User from '../../users/model/userModel'
import makeUsersDb from '../../users/model/usersDb'
import makeTransactionsDb from '../../transactions/models/transactionDb'
import { createToken } from '../../helpers/jsonwt'
import makeAddUser from '../../users/use-cases/add-user'
import setupDB from '../../test/db'
import makeBuildCreateTransaction from '../../transactions/use-cases/createTransaction'

jest.setTimeout(30000)
setupDB('transactions')

let transactionDb
let usersDb

beforeAll(() => {
  transactionDb = makeTransactionsDb({ Transaction })
  usersDb = makeUsersDb({ User, createToken })
})

describe('Send Transaction Email', () => {
  it('mails the receiver', async () => {
    const user = makeFakeUser()
    const addUser = makeAddUser({ usersDb })
    const insertedUser = await addUser(user)
    expect(insertedUser).toBeDefined()
    const found = await usersDb.findById({ id: insertedUser.user._id })
    expect(found).not.toBeNull()
    const transaction = makeFakeTransaction()
    const createTransaction = makeBuildCreateTransaction({
      transactionDb,
      sendTransaction: () => {}
    })
    const newTransaction = await createTransaction({ ...transaction })
    const sendTransaction = buildMakeSendTransaction({
      transactionDb,
      usersDb,
      sendMail,
      getTransactionEmailURL,
      transactionEmailTemplate
    })
    const toSend = await sendTransaction({
      newTransaction,
      id: insertedUser.user._id
    })
    expect(toSend[0].statusCode).toBe(202)
  })
})

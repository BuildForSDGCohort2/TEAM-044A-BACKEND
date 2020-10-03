import mongoose from 'mongoose'
import { DatabaseError } from '../../helpers/errors'
import logging from '../../configuration/logging/logger'

export default function makeWalletDb({ Wallet, usersDb, WalletTransaction }) {
  async function create({ ...walletDetails }) {
    const { userId } = walletDetails
    const newWallet = new Wallet({ ...walletDetails })
    await newWallet.save()
    const user = await usersDb.findById({ id: userId })
    user.walletId = newWallet._id
    await user.save()
    return newWallet
  }

  /** Wallet Transactions */
  async function deposit({ ...walletDetails }) {
    try {
      const { userId } = walletDetails
      const newTransaction = await new WalletTransaction({ ...walletDetails })
      await newTransaction.save()
      const wallet = await Wallet.findOne({ userId })
      wallet.balance += newTransaction.amount
      wallet.walletTransactions.addToSet(newTransaction)
      await wallet.save()
      return newTransaction
    } catch (error) {
      logging.error(`An error occured: Error ${error}`)
      throw new DatabaseError(error)
    }
  }

  async function transfer({ ...walletDetails }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const { userId, destinationWalletId, amount } = walletDetails
        const sender = await Wallet.findOne({ userId }).session(session)
        const receiver = await Wallet.findOne({
          _id: destinationWalletId
        }).session(session)
        sender.balance -= amount
        await sender.save({ session })
        receiver.balance += amount
        await receiver.save({ session })
        const newTransfer = new WalletTransaction({ ...walletDetails })
        await newTransfer.save({ session })
        sender.walletTransactions.addToSet(newTransfer)
        await sender.save({ session })
        receiver.walletTransactions.addToSet(newTransfer)
        await receiver.save({ session })
      })
    } catch (error) {
      logging.error(`An error occured: Error ${error}`)
      throw new DatabaseError(error)
    } finally {
      session.endSession()
    }
  }

  async function findByAccountId({ id: _id }) {
    const found = await Wallet.findOne({ _id }).populate('walletTransactions')
    return found
  }

  async function findUserById({ id: _id }) {
    return Wallet.find({ userId: _id }).populate('walletTransactions')
  }

  async function withdraw({ ...walletDetails }) {
    try {
      const { amount, userId } = walletDetails
      const user = await Wallet.findOne({ userId })
      user.balance -= amount
      await user.save()
      const withdrawal = new WalletTransaction({ ...walletDetails })
      await withdrawal.save()
      user.walletTransactions.addToSet(withdrawal)
      await user.save()
      return withdrawal
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  return Object.freeze({
    deposit,
    create,
    transfer,
    findByAccountId,
    withdraw,
    findUserById
  })
}

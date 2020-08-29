/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'

const objectId = mongoose.Types.ObjectId

const makeTransactionsDb = ({ User, Transaction, Escrow }) => {
  async function insert({ ...transactionInfo }) {
    try {
      const userId = transactionInfo.user.id
      const newTransaction = await new Transaction({ ...transactionInfo })
      await newTransaction.save()
      const user = await User.findById({ _id: userId })
      await user.transactions.push(newTransaction)
      await user.save()
      return newTransaction
    } catch (error) {
      console.error(error)
    }
  }

  async function update({ id: _id, ...changes }) {
    const result = await Transaction.where({ _id }).updateOne({
      $set: { ...changes }
    })
    return result.nModified > 0 ? { _id, ...changes } : null
  }

  async function remove({ id: _id }) {
    // eslint-disable-next-line no-return-await
    return await Transaction.findByIdAndDelete(objectId(_id))
  }

  async function findById({ id: _id }) {
    return await Transaction.findById(objectId(_id)).populate('initiator')
  }

  async function findMyTransactions(email) {
    const transaction = await Transaction.find({ email })
    const result = transaction
      .map((obj) => obj.email)
      .find((myMail) => myMail === email)
    const user = await User.findOne({ email: result })
    for (let i = 0; i < transaction.length; i++) {
      const toAdd = transaction[i]
      await user.transactions.addToSet(toAdd)
      await user.save()
    }
    return user
  }

  async function findByRef({ ref }) {
    return await Transaction.findOne({ reference: ref })
  }

  async function findAll() {
    return await Transaction.find().populate('initiator')
  }

  async function findByTransactionStatus(status) {
    const transactionStatus = await Transaction.find({
      transactionStatus: status
    })
    return transactionStatus
  }

  async function handleMoneyTransfer({ senderId, receiverId, amount, ref }) {
    const session = await mongoose.startSession()
    session.startTransaction()
    try {
      const sender = await User.findOne({ _id: senderId }).session(session)
      sender.balance -= amount / 100
      await sender.save({ session })
      const receiver = await User.findOne({ _id: receiverId }).session(session)
      // receiver.balance += amount
      const transactionInfo = await Transaction.findOne({
        reference: ref
      }).session(session)
      const newEscrow = await new Escrow({
        amount,
        reference: ref,
        buyerInfo: {
          buyerId: sender._id,
          email: sender.email
        },
        sellerInfo: {
          sellerId: receiverId,
          email: receiver.email
        },
        currentTransaction: {
          transaction: transactionInfo
        }
      })
      await newEscrow.save({ session })
      await session.commitTransaction()
    } catch (error) {
      await session.abortTransaction()
    } finally {
      session.endSession()
    }
  }

  return Object.freeze({
    insert,
    update,
    remove,
    findById,
    findMyTransactions,
    findByRef,
    findAll,
    findByTransactionStatus,
    handleMoneyTransfer
  })
}

export default makeTransactionsDb

import mongoose from 'mongoose'
import { DatabaseError } from '../../helpers/errors'

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
      throw new DatabaseError(error)
    }
  }

  async function update({ id: _id, ...changes }) {
    const result = await Transaction.where({ _id }).updateOne({
      $set: { ...changes }
    })
    return result.nModified > 0 ? { _id, ...changes } : null
  }

  async function remove({ id: _id }) {
    return Transaction.findByIdAndDelete(objectId(_id))
  }

  async function findById({ id: _id }) {
    return Transaction.findById(objectId(_id)).populate('initiator')
  }

  async function findMyTransactions(email) {
    try {
      const user = await User.findOne({ email })
        .select('-password -__v -createdOn -modifiedOn')
        .populate('transactions disputes')
      const transaction = await Transaction.find({ email })
      transaction.map((item) => {
        return user.transactions.addToSet(item)
      })
      return user
    } catch (error) {
      throw new DatabaseError(error.message)
    }
  }

  async function findByEmail({ email }) {
    return Transaction.findOne({ email })
  }

  async function findByRef({ ref }) {
    return Transaction.findOne({ reference: ref })
  }

  async function findAll() {
    return Transaction.find().populate('initiator')
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
      const newEscrow = new Escrow({
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
    handleMoneyTransfer,
    findByEmail
  })
}

export default makeTransactionsDb

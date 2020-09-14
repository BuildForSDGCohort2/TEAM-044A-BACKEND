/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
import mongoose from 'mongoose'

const objectId = mongoose.Types.ObjectId

const makeEscrowDb = ({ Escrow, User, Transaction }) => {
  async function findById({ id: _id }) {
    return await Escrow.findById(objectId(_id))
  }

  async function findByRef({ ref }) {
    return await Escrow.findOne({ reference: ref })
  }

  async function handleMoneyTransfer({ referenceId, receiverId, amount }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const currentTransaction = await Escrow.findOne({
          reference: referenceId
        }).session(session)
        currentTransaction.amount -= amount
        await currentTransaction.save({ session })
        const receiver = await User.findOne({ _id: receiverId })
        receiver.balance += amount
        await receiver.save({ session })
        const completedTransaction = await Transaction.findOne({
          reference: referenceId
        })
        await completedTransaction.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async function transferMoney({
    receiver,
    totalAmount,
    transactionId,
    escrowCharge
  }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const foundEscrow = await Escrow.findOne({ transactionId }).session(
          session
        )
        const user = await User.findById({ _id: receiver._id }).session(session)
        const balance = totalAmount - escrowCharge
        foundEscrow.totalAmount -= balance
        await foundEscrow.save({ session })
        user.balance += balance
        await user.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async function deposit({ ...paymentDetails }) {
    const session = await mongoose.startSession()
    try {
      await session.withTransaction(async () => {
        const newEscrow = await new Escrow({ ...paymentDetails })
        await newEscrow.save({ session })
      })
    } finally {
      session.endSession()
    }
  }

  async function findEscrow({ msg }) {
    const found = await Escrow.findOne({ transactionId: objectId(msg) })
    return found
  }

  async function findAll() {
    return await Escrow.find()
      .populate('currentTransaction')
      .populate('sellerInfo')
      .exec()
  }

  async function update({ id: _id, ...changes }) {
    const found = await Escrow.where({ _id }).updateOne({
      $set: { ...changes }
    })
    return found.nModified > 0 ? { _id, ...changes } : null
  }

  return Object.freeze({
    findById,
    findByRef,
    findAll,
    handleMoneyTransfer,
    deposit,
    findEscrow,
    transferMoney,
    update
  })
}

export default makeEscrowDb

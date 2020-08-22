/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
import mongoose from 'mongoose'

const objectId = mongoose.Types.ObjectId
const makeUsersDb = ({ User, createToken }) => {
  async function insert({ ...userInfo }) {
    const user = await new User({ ...userInfo })
    const userId = {
      id: user._id
    }
    const token = await createToken(userId)
    await user.save()
    return { user, token }
  }

  async function update({ id: _id, ...changes }) {
    const result = await User.where({ _id })
      .updateOne({ $set: { ...changes } })
      .exec()
    return result.nModified > 0 ? { _id, ...changes } : null
  }

  async function findByEmail(user) {
    return await User.findOne({ email: user.email }).populate('transactions')
  }

  async function findById({ id: _id }) {
    return await User.findById(objectId(_id)).populate('transactions').exec()
  }

  // Mark the transaction that is on-going
  // Find the transaction from the transaction collections

  // async function findMyTransactions({ email }) {
  //   console.log('THE INCOMING EMAIL IS', email)
  //   const found = await User.findOne({ 'transactions.email': email })
  //   console.log('FOUND TRANSACTION', found)
  //   return found
  // }

  return Object.freeze({
    insert,
    update,
    findByEmail,
    findById
    // findMyTransactions
  })
}

export default makeUsersDb

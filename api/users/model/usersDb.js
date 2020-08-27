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

  async function findByEmail({ email }) {
    return await User.findOne({ email }).populate('transactions')
  }

  async function findById({ id: _id }) {
    return await User.findById(objectId(_id)).populate('transactions').exec()
  }

  async function findAll() {
    return await User.find()
  }

  return Object.freeze({
    insert,
    update,
    findByEmail,
    findById,
    findAll
  })
}

export default makeUsersDb

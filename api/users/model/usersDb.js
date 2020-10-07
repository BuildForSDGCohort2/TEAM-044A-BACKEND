/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose'
import { DatabaseError } from '../../helpers/errors'

const objectId = mongoose.Types.ObjectId
const makeUsersDb = ({ User, createToken, hashPassword }) => {
  async function insert({ ...userInfo }) {
    try {
      if (userInfo.password) {
        // eslint-disable-next-line no-param-reassign
        userInfo.password = await hashPassword(userInfo.password)
      }
      const newUser = new User({ ...userInfo })
      const userId = {
        id: newUser._id
      }

      const token = await createToken(userId)
      const user = await newUser.save()
      return { user, token }
    } catch (error) {
      throw new DatabaseError(error)
    }
  }

  async function update({ id: _id, ...changes }) {
    const result = await User.where({ _id })
      .updateOne({ $set: { ...changes } })
      .exec()
    return result.nModified > 0 ? { _id, ...changes } : null
  }

  async function findByEmail({ email }) {
    return User.findOne({ email }).populate('transactions')
  }

  async function findById({ id: _id }) {
    return User.findById(objectId(_id))
      .populate('transactions')
      .select('-password -__v -createdOn -modifiedOn -isVerified -source')
  }

  async function findAll() {
    return User.find().select('-password')
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

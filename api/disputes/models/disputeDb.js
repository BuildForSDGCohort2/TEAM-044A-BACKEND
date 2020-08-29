import { Types } from 'mongoose'
const objectId = Types.ObjectId

const makeDisputeDb = ({ Dispute }) => {
  async function insert({ ...info }) {
    const dispute = await new Dispute({ ...info })
    await dispute.save()
    return { dispute }
  }

  async function findAll() {
    return await Dispute.find().populate('transactionId')
  }

  async function findById({ id: _id }) {
    return await Dispute.findById(objectId(_id))
  }

  async function update({ id: _id, ...changes }) {
    const found = await Dispute.where({ _id }).updateOne({
      $set: { ...changes }
    })
    return found ? { _id, ...changes } : null
  }

  return Object.freeze({
    insert,
    findAll,
    findById,
    update
  })
}

export default makeDisputeDb

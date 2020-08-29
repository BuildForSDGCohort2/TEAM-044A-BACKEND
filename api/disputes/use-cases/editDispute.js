import makeDispute from '../factory'

const makeEditDispute = ({ disputeDb }) => {
  return async function editDispute({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.')
    }
    const currentTransaction = await disputeDb.findById({ id })
    if (!currentTransaction) {
      throw new RangeError('Dispute does not exist.')
    }
    const transaction = makeDispute({ ...changes })
    return disputeDb.update({
      decision: transaction.getDecision(),
      disputeStatus: transaction.getStatus(),
      updatedAt: transaction.getUpdatedAt(),
      id
    })
  }
}

export default makeEditDispute

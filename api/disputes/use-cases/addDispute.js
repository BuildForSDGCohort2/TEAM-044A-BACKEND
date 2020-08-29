import makeDispute from '../factory'

const makeAddDispute = ({ transactionDb, disputeDb, sendDisputeMail }) => {
  return async function addDispute({ transactionId, ...disputeInfo } = {}) {
    const transaction = makeDispute({ transactionId, ...disputeInfo })
    const currentTransaction = await transactionDb.findById({
      id: transaction.getId()
    })
    if (!currentTransaction) {
      throw new Error('Transaction does not exist.')
    }

    const dispute = await disputeDb.insert({
      transactionId: transaction.getId(),
      decision: transaction.getDecision(),
      disputeStatus: transaction.getStatus(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt()
    })
    await sendDisputeMail({ transactionId })
    return dispute
  }
}

export default makeAddDispute

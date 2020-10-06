/* eslint-disable prefer-const */
const makeInProgress = ({ transactionDb, sendInProgressEmail }) => {
  return async function inProgress({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'In Progress'
    await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendInProgressEmail({ ref, initiator })
    ])
  }
}

export default makeInProgress

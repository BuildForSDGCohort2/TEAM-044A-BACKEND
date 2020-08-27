/* eslint-disable no-underscore-dangle */

/**
 * This is responsible for when a user chooses to agree to the current transaction
 * POST - Accept transaction
 * @param {string} makesAcceptTransaction
 */
const makesAcceptTransaction = ({
  transactionDb,
  usersDb,
  sendAcceptanceEmail
}) => {
  return async function acceptTransaction({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'Transaction Accepted - Not funded'
    await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendAcceptanceEmail({ _id, initiator })
    ])
  }
}
export default makesAcceptTransaction

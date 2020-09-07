/* eslint-disable prefer-const */
/**
 * Customer Reject Transaction use-case
 * @function makeRejectDeliveredTransaction
 * POST request
 */
const makeRejectDeliveredTransaction = ({
  transactionDb,
  usersDb,
  sendDeliveryRejectionEmail
}) => {
  return async function rejectDeliveredTransaction({ ref }) {
    /**
     * @param {string} currentTransaction
     */

    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    const user = await usersDb.findById({ id: initiator })
    transactionStatus = 'Transaction Delivery Rejected'
    await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendDeliveryRejectionEmail({ ref, user })
    ])
  }
}

export default makeRejectDeliveredTransaction

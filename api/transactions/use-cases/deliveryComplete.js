/* eslint-disable prefer-const */
const makeDeliveryComplete = ({ transactionDb, sendDeliveryEmail }) => {
  return async function deliveryComplete({ ref }) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'Delivered'
    const [updated] = await Promise.all([
      transactionDb.update({
        id: _id,
        transactionStatus
      }),
      sendDeliveryEmail({ ref, initiator })
    ])
    return updated
  }
}

export default makeDeliveryComplete

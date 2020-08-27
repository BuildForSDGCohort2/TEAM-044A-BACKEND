const makeDeliveryComplete = ({ transactionDb, sendDeliveryEmail }) => {
  return async function deliveryComplete({ user, ref }) {
    const { transactions } = user
    transactions.forEach(async (el) => {
      const found = el.reference === ref
      if (found) {
        const currentTransaction = await transactionDb.findByRef({ ref })
        let { transactionStatus, _id } = currentTransaction
        transactionStatus = 'Delivered'
        await Promise.all([
          transactionDb.update({
            id: _id,
            transactionStatus
          }),
          sendDeliveryEmail({ ref, user })
        ])
      }
    })
  }
}

export default makeDeliveryComplete

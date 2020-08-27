const makeConfirmTransaction = ({ transactionDb, sendConfirmEmail }) => {
  return async function confirmTransation({ user, ref }) {
    const { transactions } = user
    transactions.forEach(async (el) => {
      const found = el.reference === ref
      if (found) {
        const currentTransaction = await transactionDb.findByRef({ ref })
        let { transactionStatus, _id } = currentTransaction
        transactionStatus = 'Buyer confirmed Order'
        await Promise.all([
          transactionDb.update({ id: _id, transactionStatus }),
          sendConfirmEmail({ ref, user })
        ])
        // trigger pay of
      }
    })
  }
}

export default makeConfirmTransaction

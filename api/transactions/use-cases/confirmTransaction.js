const makeConfirmTransaction = ({ transactionDb, sendConfirmEmail }) => {
  return async function confirmTransation({ ref } = {}) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus, _id, initiator } = currentTransaction
    transactionStatus = 'Buyer confirmed Order'
    const [updated, email] = await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendConfirmEmail({ ref, initiator })
    ])
    return updated
    // trigger pay of
  }
}

export default makeConfirmTransaction

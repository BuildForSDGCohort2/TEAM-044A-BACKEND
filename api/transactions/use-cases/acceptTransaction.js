/* eslint-disable no-underscore-dangle */
const makesAcceptTransaction = ({ transactionDb, sendAcceptanceEmail }) => {
  return async function acceptTransaction({ user, ref }) {
    const { transactions } = user
    transactions.forEach(async (el) => {
      const found = el.transactionStatus !== 'Ongoing' && el.reference === ref
      if (found) {
        const currentTransaction = await transactionDb.findByRef({ ref })
        const transactionId = currentTransaction._id
        let status = currentTransaction.transactionStatus
        status = 'Ongoing'
        await transactionDb.update({
          transactionStatus: status,
          id: transactionId
        })
        await sendAcceptanceEmail({ transactionId, user })
      }
      return found
    })
  }
}
export default makesAcceptTransaction

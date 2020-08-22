/* eslint-disable no-return-await */
const makeListTransactions = ({ transactionDb }) => {
  return async function listTransactions({ ref } = {}) {
    return ref
      ? await transactionDb.findByRef({ ref })
      : await transactionDb.findAll()
  }
}

export default makeListTransactions

import { InvalidPropertyError } from '../../helpers/errors'

const makeListTransactions = ({ usersDb, transactionDb }) => {
  return async function listTransactions({ id } = {}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { email } = user
    const found = await transactionDb.findMyTransactions(email)
    return found.transactions
  }
}

export default makeListTransactions

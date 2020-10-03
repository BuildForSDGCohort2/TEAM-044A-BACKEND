import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const makeListUser = ({ usersDb, transactionsDb }) => {
  return async function listUser({ id = requiredParam('Id') } = {}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { email } = user
    return transactionsDb.findMyTransactions(email)
  }
}

export default makeListUser

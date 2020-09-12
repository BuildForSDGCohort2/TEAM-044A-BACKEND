/* eslint-disable no-return-await */
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const makeListUser = ({ usersDb, transactionDb }) => {
  return async function listUser({ id = requiredParam('Id') } = {}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { email } = user

    return await transactionDb.findMyTransactions(email)
  }
}

export default makeListUser

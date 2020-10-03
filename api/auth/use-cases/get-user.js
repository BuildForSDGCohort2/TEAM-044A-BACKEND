import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const makeListUser = ({ usersDb }) => {
  return async function listUser({ id = requiredParam('Id') } = {}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }
    return user
  }
}

export default makeListUser

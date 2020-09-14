import makeUser from '../factory'
import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

const makeEditUser = ({ usersDb }) => {
  return async function editUser({
    id = requiredParam('Id'),
    ...changes
  } = {}) {
    const exists = await usersDb.findById({ id })
    if (!exists) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const user = makeUser({ ...changes })
    return usersDb.update({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword(),
      dob: user.getDOB(),
      username: user.getUsername(),
      modifiedOn: user.getModifiedOn(),
      id
    })
  }
}

export default makeEditUser

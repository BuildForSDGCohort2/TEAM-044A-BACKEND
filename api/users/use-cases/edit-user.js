import makeUser from '../factory'

const makeEditUser = ({ usersDb }) => {
  return async function editUser({ id, ...changes } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.')
    }

    const exists = await usersDb.findById(id)
    if (!exists) {
      throw new RangeError('User does not exist.')
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
      modifiedOn: user.getModifiedOn()
    })
  }
}

export default makeEditUser

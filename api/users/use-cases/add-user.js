import makeUser from '../factory'

const makeAddUser = ({ usersDb }) => {
  return async function addUser(userInfo) {
    const user = makeUser(userInfo)
    // const exists = await usersDb.findByEmail({ email: user.getEmail() })
    // if (exists) {
    //   throw new Error('Email address is registered already.')
    // }

    const userSource = user.getSource()
    return usersDb.insert({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword(),
      dob: user.getDOB(),
      username: user.getUsername(),
      createdOn: user.getCreatedOn(),
      modifiedOn: user.getModifiedOn(),
      source: {
        ip: userSource.getIp(),
        browser: userSource.getBrowser(),
        referrer: userSource.getReferrer()
      }
    })
  }
}

export default makeAddUser

import makeUser from '../factory'
import { UniqueConstraintError } from '../../helpers/errors'
// import publishToQueue from '../../pubsub/publisher'

const makeAddUser = ({ usersDb }) => {
  return async function addUser(userInfo) {
    const user = makeUser(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (exists) {
      throw new UniqueConstraintError('Email address')
    }

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

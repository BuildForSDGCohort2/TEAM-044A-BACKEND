/* eslint-disable no-underscore-dangle */
import makeAuth from '../factory'
import { InvalidPropertyError } from '../../helpers/errors'
import { validatePassword } from '../../helpers/jsonwt'

const makeLoginUser = ({ usersDb, sendTokenResponse }) => {
  return async function loginUser(userInfo) {
    const user = makeAuth(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (!exists) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const password = await validatePassword(user.getPassword(), exists.password)
    if (!password) {
      throw new InvalidPropertyError('Password is incorrect.')
    }

    const payload = {
      id: exists._id
    }

    return sendTokenResponse(payload)
  }
}

export default makeLoginUser

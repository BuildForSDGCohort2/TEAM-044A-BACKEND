/* eslint-disable no-underscore-dangle */
import makeAuth from '../factory'
import { InvalidPropertyError } from '../../helpers/errors'
import { validatePassword } from '../../helpers/jsonwt'

const makeLoginUser = ({ usersDb, sendTokenResponse }) => {
  return async function loginUser(userInfo) {
    const user = makeAuth(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    const password = await validatePassword(user.getPassword(), exists.password)
    if (!exists || !password) {
      throw new InvalidPropertyError('Email or password is incorrect.')
    }

    const payload = {
      id: exists._id
    }

    return sendTokenResponse(payload)
  }
}

export default makeLoginUser

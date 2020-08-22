/* eslint-disable no-underscore-dangle */
import makeAuth from '../factory'

const makeLoginUser = ({ usersDb, sendTokenResponse }) => {
  return async function loginUser(userInfo) {
    const user = makeAuth(userInfo)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (!exists) {
      throw new Error('User does not exist.')
    }

    const payload = {
      id: exists._id
    }

    return sendTokenResponse(payload)
  }
}

export default makeLoginUser

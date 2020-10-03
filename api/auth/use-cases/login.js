/* eslint-disable no-underscore-dangle */
import makeAuth from '../factory'
import { InvalidPropertyError } from '../../helpers/errors'
import { validatePassword } from '../../helpers/jsonwt'
import publisher from '../../pubsub/publisher'
import consumer from '../../pubsub/subscriber'
import { verifyUser } from '../../mail'

const makeLoginUser = ({ usersDb, sendTokenResponse }) => {
  return async function loginUser(userInfo) {
    const user = makeAuth(userInfo)

    const exists = await usersDb.findByEmail({
      email: user.getEmail().toLowerCase()
    })
    if (!exists) {
      throw new InvalidPropertyError('User does not exist.')
    }

    const { isVerified, _id } = exists
    if (!isVerified) {
      await publisher(_id.toString(), 'newuser.verify')
      await consumer('email_queue_one', verifyUser, '*.verify')
      throw new InvalidPropertyError('Please verify your mail.')
    } else {
      const password = await validatePassword(
        user.getPassword(),
        exists.password
      )
      if (!password) {
        throw new InvalidPropertyError('Password is incorrect.')
      }

      const payload = {
        id: exists._id
      }

      return sendTokenResponse(payload)
    }
  }
}

export default makeLoginUser

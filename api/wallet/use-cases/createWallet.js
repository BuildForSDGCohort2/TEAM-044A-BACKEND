import { InvalidPropertyError } from '../../helpers/errors'
import requiredParam from '../../helpers/requireParam'

export default function createNewWallet({ walletDb, usersDb }) {
  return async function createWallet({ user = requiredParam('User Id') }) {
    console.log({ user })
    const found = await usersDb.findById({ id: user.id })
    if (!found) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { _id, email } = found

    return walletDb.create({
      userId: _id,
      userEmail: email
    })
  }
}

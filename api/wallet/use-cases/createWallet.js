import { InvalidPropertyError } from '../../helpers/errors'
import requiredParam from '../../helpers/requireParam'

export default function createNewWallet({ walletDb, usersDb }) {
  return async function createWallet({ id = requiredParam('User Id') }) {
    const found = await usersDb.findById({ id })
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

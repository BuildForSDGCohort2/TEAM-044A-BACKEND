import { InvalidPropertyError } from '../../helpers/errors'
import makeWallet from '../factory'
import requiredParam from '../../helpers/requireParam'

export default function makeWalletTransfer({ walletDb, usersDb }) {
  return async function walletTransfer({
    id = requiredParam('User Id'),
    ...walletDetails
  }) {
    const transfer = makeWallet(walletDetails)
    const foundUser = await usersDb.findById({ id })
    if (!foundUser) {
      throw new InvalidPropertyError('User does not exist.')
    }
    const { walletId, _id } = foundUser
    const sender = await walletDb.findByAccountId({ id: walletId })
    if (!sender) {
      throw new InvalidPropertyError('Wallet does not exist.')
    }
    const { balance } = sender
    if (balance < walletDetails.amount || balance <= 0) {
      throw new InvalidPropertyError(
        'Insufficient funds to perform this operation.'
      )
    }
    const { destinationWalletId } = walletDetails
    const found = await walletDb.findByAccountId({
      id: destinationWalletId
    })
    if (!found) {
      throw new InvalidPropertyError('Account number does not exist.')
    }

    return walletDb.transfer({
      destinationWalletId: transfer.getDestinationAccount(),
      amount: transfer.getAmount(),
      operationType: transfer.getOperation(),
      reference: transfer.getRef(),
      createdAt: transfer.getCreatedAt(),
      userId: _id
    })
  }
}

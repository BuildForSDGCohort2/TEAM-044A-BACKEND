import { InvalidPropertyError } from '../../helpers/errors'
import makeWallet from '../factory'

export default function makeWalletWithdrawal({ walletDb }) {
  return async function walletWithdrawal({ user, ...walletDetails }) {
    const withdrawal = makeWallet(walletDetails)
    const { _id, walletId } = user
    const accountOwner = await walletDb.findByAccountId({ id: walletId })
    const { balance } = accountOwner
    // checks to see if the requested amount is greater than the user's balance
    if (walletDetails.amount > balance) {
      throw new InvalidPropertyError('Insufficient funds.')
    }

    // send mail here
    return walletDb.withdraw({
      amount: withdrawal.getAmount(),
      reference: withdrawal.getRef(),
      createdAt: withdrawal.getCreatedAt(),
      operationType: withdrawal.getOperation(),
      userId: _id
    })
  }
}

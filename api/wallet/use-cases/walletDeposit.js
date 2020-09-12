import makeWallet from '../factory'
import requiredParam from '../../helpers/requireParam'

export default function makeWalletDeposit({ walletDb }) {
  return async function walletDeposit({
    userId = requiredParam('User Id'),
    ...walletDetails
  }) {
    const newDeposit = makeWallet(walletDetails)
    return walletDb.deposit({
      amount: newDeposit.getAmount(),
      operationType: newDeposit.getOperation(),
      createdAt: newDeposit.getCreatedAt(),
      reference: newDeposit.getRef(),
      userId
    })
  }
}

import requiredParam from '../../helpers/requireParam'
import { InvalidPropertyError } from '../../helpers/errors'

export default function buildMakeWalletFactory() {
  return function makeWallet({ amount = requiredParam('Amount') } = {}) {
    if (typeof amount !== 'number' || amount <= 0) {
      throw new InvalidPropertyError(
        'Amount must be a valid number and must be greater than zero.'
      )
    }

    return Object.freeze({
      getAmount: () => amount
    })
  }
}

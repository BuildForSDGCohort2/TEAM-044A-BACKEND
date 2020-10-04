/* eslint-disable no-return-assign */
import requiredParam from '../../helpers/requireParam'
import {
  InvalidPropertyError,
  RequiredParameterError
} from '../../helpers/errors'

export default function buildMakeWalletFactory({ uuidv4 }) {
  return function makeWallet({
    amount = requiredParam('Amount'),
    operationType = requiredParam('Type'),
    destinationWalletId,
    createdAt = Date.now()
  } = {}) {
    if (!amount || amount <= 0) {
      throw new InvalidPropertyError('Amount must be greater than zero.')
    }

    if (typeof amount === 'string') {
      amount = Number(amount)
    }

    if (!operationType) {
      throw new RequiredParameterError('Operation type e.g deposit or withdraw')
    }

    let reference
    function makeRef() {
      return uuidv4()
    }

    return Object.freeze({
      getAmount: () => amount,
      getRef: () => reference || (reference = makeRef()),
      getOperation: () => operationType,
      getCreatedAt: () => createdAt,
      getDestinationAccount: () => destinationWalletId
    })
  }
}

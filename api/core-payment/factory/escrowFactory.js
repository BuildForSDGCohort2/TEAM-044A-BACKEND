export default function buildMakeEscrowDetails() {
  return function makeEscrow({
    amount,
    reference,
    buyerId,
    sellerId,
    inspectionPeriod,
    dueDate,
    transactionStatus
  } = {}) {
    if (!amount || typeof amount !== 'number') {
      throw new Error('Amount must be a valid number')
    }

    if (!reference) {
      throw new Error('You must include a reference id.')
    }

    if (!buyerId) {
      throw new Error('You must specify buyer id.')
    }

    if (!sellerId) {
      throw new Error('You must specify seller id.')
    }

    if (!inspectionPeriod) {
      throw new Error('Inspection period is required.')
    }

    if (!dueDate) {
      throw new Error('Due date is required.')
    }

    if (!transactionStatus) {
      throw new Error('Transaction status must be specified')
    }

    return Object.freeze({
      getAmount: () => amount,
      getReference: () => reference,
      getBuyerId: () => buyerId,
      getSellerId: () => sellerId,
      getPeriod: () => inspectionPeriod,
      getDate: () => dueDate,
      getTransactionStatus: () => transactionStatus
    })
  }
}

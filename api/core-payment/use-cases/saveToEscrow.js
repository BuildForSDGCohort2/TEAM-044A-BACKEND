import { makeEscrow } from '../factory'

export default function saveToEscrow({ escrowDb }) {
  return async function sendToEscrow({ ...transactionDetails }) {
    const newPayment = makeEscrow({ ...transactionDetails })
    return escrowDb.insert({
      amount: newPayment.getAmount(),
      reference: newPayment.getReference(),
      buyerId: newPayment.getBuyerId(),
      sellerId: newPayment.getSellerId(),
      inspectionPeriod: newPayment.getPeriod(),
      dueDate: newPayment.getDate(),
      transactionStatus: newPayment.getTransactionStatus()
    })
  }
}

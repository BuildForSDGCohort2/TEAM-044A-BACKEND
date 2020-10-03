import { sendNotificationEmail } from '../../mail'
import { makeEscrow } from '../../core-payment/factory'

const makeVerifyTransaction = ({ transactionDb, escrowDb }) => {
  return async ({ user, ...details }) => {
    const { totalAmount } = details
    const { reference } = details.details
    try {
      const ref = reference
      const buyerId = user.id
      const found = await transactionDb.findByRef({ ref })
      const depositedFund = makeEscrow({
        totalAmount,
        reference,
        buyerId
      })
      const payment = {
        totalAmount: depositedFund.getAmount(),
        reference: depositedFund.getReference(),
        buyerId: depositedFund.getBuyerId(),
        escrowCharge: depositedFund.getEscrowCharge(),
        transactionId: found._id,
        isPaid: true
      }

      const [deposit, updated] = await Promise.all([
        escrowDb.deposit(payment),
        transactionDb.update({
          id: found._id,
          transactionStatus: 'Accepted and Funded',
          tag: 'bft'
        }),
        sendNotificationEmail({ ref, user })
      ])
      return [deposit, updated]
    } catch (error) {
      console.error(error)
    }
  }
}

export default makeVerifyTransaction

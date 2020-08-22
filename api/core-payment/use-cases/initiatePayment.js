/* eslint-disable no-return-await */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-assign */
/* eslint-disable no-underscore-dangle */
import { makePayment } from '../factory'

export default function initiatePayment({
  usersDb,
  sendNotificationEmail,
  transactionDb
}) {
  return async function sendMoney({ ref, user }) {
    const { transactions } = user
    transactions.forEach(async (el) => {
      const found = el.transactionStatus === 'Ongoing' && el.reference === ref
      if (found) {
        const ongoingTransaction = await transactionDb.findByRef({
          ref: el.reference
        })
        const receiver = await usersDb.findByEmail({
          email: ongoingTransaction.email
        })
        // const transactionRef = ongoingTransaction.reference
        const transactionAmount = ongoingTransaction.amount
        const senderAccountBalance = user.balance
        const receiverId = receiver._id
        const senderId = user._id
        const paymentInfo = makePayment({
          transactionAmount,
          senderAccountBalance,
          receiverId
        })
        await Promise.all([
          transactionDb.handleMoneyTransfer({
            senderId,
            receiverId: paymentInfo.getReceiver(),
            amount: paymentInfo.getAmountToPay(),
            ref
          }),
          sendNotificationEmail({ ref, user })
        ])
      }
      /**
       *  Todo
       *  1) Work on the return values from the api.
       */
      return true
    })
  }
}

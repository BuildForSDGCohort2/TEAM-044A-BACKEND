/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
export default function makeReleaseFunds({
  escrowDb,
  moment,
  setCronJob,
  transactionDb
}) {
  return async function releaseFunds({ referenceId }) {
    /**
     *  1) I as a loggedIn user, I can see the list of transactions pending
     *     which is gotten from my transactions array.
     *  2) I want to send the amount specified in the transaction details from my account to escrow
     *  3) I can find this transaction amount, by looking up the transactions array and pulling it by its reference, How?
     *  4) I can solve this by looking for the transactionStatus that is marked as 'Ongoing' or 'Accepted' then retrieve from the
     *     transactions in my transactions array.
     *  5) After finding the 'Ongoing' transactions, I then proceed to pay to escrow
     *  6) The escrow collects the money from my balance alongisde the details of the transaction and to whom the money is going to.
     *  7) Upon successful deduction of the money from my balance, the receiver is notified that I have paid and the money is held for the
     *     specified number of days marked by the 'inspectionPeriod' which is in milliseconds
     *  8) When the inspectionPeriod is up, I as the loggedIn user has a 24/48hr window to raise a dispute
     *     If i don't raise a dispute, the escrow goes on to send the money to a reciever. How?
     *  9) A cron job is run every second that will check if the inspectionPeriod is due and if it has elapsed the 24hr window. || messaging system
     *  10) Upon successful payment to the receiver, I as the loggedIn user will be notified by the escrow and the transaction will be marked
     *      'Completed'
     */

    /**
     *  To send money from the escrow account to the specified receiver, what do I do?
     *  1) I have to find the receiver that is tied to an escrow account through the transaction reference
     *  2) After finding the receiver, I go on to find the amount that is also tied to that escrow document
     *  3) After retriving both of these fields, i perform the necessary maths to deduct from the escrow account
     *  4) send it to the receiver, and send the escrow profit to the bank account.
     *  5) After completing these steps, I go onto delete this document from the DB.
     *
     */

    const receiver = await escrowDb.findByRef({ ref: referenceId })
    const receiverId = receiver.sellerInfo.sellerId
    const transactionAmount = receiver.amount
    const amount = transactionAmount - 0.025 * transactionAmount
    const currentTransaction = await transactionDb.findByRef({
      ref: referenceId
    })
    const { inspectionPeriod } = currentTransaction
    if (inspectionPeriod === moment(Date.now()).valueOf()) {
      // wait for 24 hours
      // send notification email to the customer
      const elapsedHours = moment(Date.now()).add(24, 'hours')

      // send money to seller
      if (elapsedHours) {
        setCronJob(
          await escrowDb.handleMoneyTransfer({
            referenceId,
            receiverId,
            amount
          })
        )
      }
    }
  }
}

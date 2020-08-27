/**
 * WorkFlow -------------
 * 1) Signup --- Done
 * 2) Create Transaction --- Done
 * 3) Recipient gets notification of pending transaction --- Done
 * 4) If recipeient isn't signed up yet, they go ahead to signup --- Done
 * 5) Once recipient signs up, he sees the pending transaction --- Done
 * 6) Reciepient can either choose to accept or reject
 * 7) If recipient chooses to accept, a notification is sent to the buyer notifying him/her
 *  that the reciepient has accepted XYZ transaction and the transaction status is changed
 *  to `Accepted- Yet to be funded`
 *  If the seller rejects the transaction, the buyer is notified and the transaction status is changed to `Seller rejects transaction`
 * 8) At this point, the buyer goes on to pay XYZ amount.
 * 9) At this point, the amount to be paid plus fees to be calculated is displayed to his screen
 * 10) He/she goes onto the payment gateway and then inputs his card details and the respective amount
 * 11) In this case - we mimick the process, How?
 * 12) The inputted amount is saved to the escrowDb that carries the buyer details, recipient details, transaction details
 * 13) At this point, the recipient is notified that the buyer has paid and the status changes to `Buyer funded Transaction`
 * 14) The recipient then goes onto deliver the product or service and the status changes to `In progress`
 * 15) If the buyer rejects the deliverd product or service, the status changes to `delivery reject` and the money is still held in escrow
 * 16)
 */

import _ from 'lodash'
import { makeHttpError, apiResponse } from '../../helpers/http-response'
import transactionDb from '../../transactions/models/index'
import request from 'request'
import escrowDb from '../../core-payment/models'
import { sendNotificationEmail } from '../../mail'
import { makeEscrow } from '../../core-payment/factory'
const { initializePayment, verifyPayment } = require('../../paystack/paystack')(
  request
)

export const createTransaction = async (req, res) => {
  try {
    const user = req.user
    const ref = req.params.ref
    const { transactions } = user

    const currentTransaction = await transactionDb.findByRef({ ref })
    const { amount, email } = currentTransaction
    const amountToPay = amount * 0.025 + amount
    const order = {
      email,
      amount: amountToPay,
      reference: ref
    }
    initializePayment(order, (error, body) => {
      if (error) {
        return res.status(400).json({
          title: error.name,
          message: error.message,
          stack: error.stack
        })
      }
      const response = JSON.parse(body)
      res.redirect(response.data.authorization_url)
    })
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      title: error.name,
      stack: error.stack
    })
  }
}

export const verifyTransaction = (req, res) => {
  try {
    const ref = req.query.reference
    const buyerId = req.user._id
    const user = req.user

    verifyPayment(ref, async (error, body) => {
      if (error) {
        res.status(400).json({
          title: error.name,
          message: error.message,
          stack: error.stack
        })
      }
      const response = JSON.parse(body)
      const data = _.at(response.data, ['reference', 'amount'])
      const [reference, totalAmount] = data
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

      await Promise.all([
        escrowDb.deposit(payment),
        transactionDb.update({
          id: found._id,
          transactionStatus: 'Accepted and Funded'
        }),
        sendNotificationEmail({ ref, user })
      ])
      return res.status(200).json({
        status: true,
        message: 'Success',
        data: { payment }
      })
    })
  } catch (error) {
    return res.status(400).json({
      title: error.name,
      message: error.name,
      stack: error.stack
    })
  }
}

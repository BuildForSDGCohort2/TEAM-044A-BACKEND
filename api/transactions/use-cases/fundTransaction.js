import _ from 'lodash'
import request from 'request'
import transactionDb from '../models/index'
import escrowDb from '../../core-payment/models'
import { sendNotificationEmail } from '../../mail'
import { makeEscrow } from '../../core-payment/factory'

const { initializePayment, verifyPayment } = require('../../paystack/paystack')(
  request
)

export const createTransaction = async (req, res) => {
  try {
    const { ref } = req.params

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
      console.log(response)
      res.redirect(response.data.authorization_url)
    })
  } catch (error) {
    res.status(400).json({
      message: error.message,
      title: error.name,
      stack: error.stack
    })
    process.exit(0)
  }
}

export const verifyTransaction = (req, res) => {
  try {
    const ref = req.query.reference
    const buyerId = req.user._id
    const { user } = req

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

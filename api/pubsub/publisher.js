/* eslint-disable no-use-before-define */
import amqp from 'amqplib/callback_api'
import escrowDb from '../core-payment/models'
import transactionDb from '../transactions/models'
import usersDb from '../users/model'

export default async function publisher({ transactionID }) {
  return amqp.connect('amqp://localhost', (err, connection) => {
    if (err) {
      throw err
    }

    connection.createChannel(async (error, channel) => {
      if (error) {
        throw err
      }

      const exchange = 'disbursements'
      const key = 'transfers'
      const msg = await transfer(transactionID)
      const queue = 'escrow'
      channel.assertExchange(exchange, 'direct', { durable: true })
      channel.assertQueue(queue, { exclusive: true, durable: true })
      channel.prefetch(1)
      channel.publish(exchange, key, Buffer.from(msg), {
        persistent: true
      })
    })
  })
}

async function transfer(transactionID) {
  const transaction = await escrowDb.findEscrow({ transactionID })
  const {
    totalAmount,
    transactionId,
    escrowCharge,
    _id,
    isCustomerPaid
  } = transaction
  const currentTransaction = await transactionDb.findById({
    id: transactionId
  })
  const { email } = currentTransaction
  const { inspectionPeriod } = currentTransaction
  const receiver = await usersDb.findByEmail({ email })
  if (isCustomerPaid) {
    throw new Error('The recipient money has been disbursed already.')
  } else if (inspectionPeriod === Date.now()) {
    await escrowDb
      .transferMoney({
        totalAmount,
        transactionId,
        escrowCharge,
        receiver
      })
      .then(async () => {
        const result = await escrowDb.update({
          id: _id,
          isCustomerPaid: true
        })
        return result
      })
  }
}

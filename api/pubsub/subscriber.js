/* eslint-disable no-use-before-define */
import amqp from 'amqplib/callback_api'
import { disburse } from './events'
import { createWallet } from '../wallet/use-cases'

const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'
export default function subscriber() {
  amqp.connect(url, (err, conn) => {
    console.log(`CONNECTED TO: ${url}`)
    conn.createChannel((error, channel) => {
      if (error) {
        console.log(`An error occured ${error}`)
      }

      const exchange = 'escrow'
      const queue = 'disburse'
      const walletQueue = 'wallet_queue'
      channel.assertExchange(exchange, 'direct', { durable: true })
      channel.assertQueue(queue, { durable: true })
      channel.assertQueue(walletQueue, { durable: true })
      // escrow queue
      channel.bindQueue(queue, exchange, 'disbursement')
      // wallet queue
      channel.bindQueue(walletQueue, exchange, '*.walletCreation.*')
      channel.consume(
        queue,
        async (msg) => {
          await disburse(msg.content.toString())
          await createWallet(msg.content.toString())
          channel.ack(msg)
        },
        { noAck: false }
      )

      // wallet consumer
      channel.consume(
        walletQueue,
        async (msg) => {
          // await disburse(msg.content.toString())
          await createWallet(msg.content.toString())
          channel.ack(msg)
        },
        { noAck: false }
      )
    })
  })
}

/* eslint-disable no-use-before-define */
import amqp from 'amqplib/callback_api'
import { disburse } from './events'

const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'
export default function subscriber() {
  amqp.connect(url, (err, conn) => {
    conn.createChannel((error, channel) => {
      if (error) {
        console.log(`An error occured ${error}`)
      }

      const exchange = 'escrow'
      const queue = 'disburse'
      channel.assertExchange(exchange, 'direct', { durable: true })
      channel.assertQueue(queue, { durable: true })
      channel.bindQueue(queue, exchange, 'disbursement')
      channel.consume(
        queue,
        async (msg) => {
          await disburse(msg.content.toString())
          channel.ack(msg)
        },
        { noAck: false }
      )
    })
  })
}

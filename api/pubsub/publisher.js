/* eslint-disable no-use-before-define */
import amqp from 'amqplib/callback_api'

let ch = null
const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'
amqp.connect(url, (err, conn) => {
  conn.createChannel((err, channel) => {
    if (err) {
      throw err
    }
    const exchange = 'escrow'
    ch = channel
    channel.assertExchange(exchange, 'direct', { durable: true })
  })
})

export default async function publishToQueue(exchange, routingKey, data) {
  return ch.publish(exchange, routingKey, Buffer.from(data))
}

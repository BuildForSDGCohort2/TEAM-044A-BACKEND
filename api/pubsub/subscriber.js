import amqp from 'amqplib'
import AMQP_URI from '../helpers/config'
import { MessageBrokerError } from '../helpers/errors'

const assertQueueOptions = { durable: true }
const assertExchangeOptions = { durable: true }
const consumeQueueOptions = { noAck: false }
const exchange = 'escrow'

const consumer = async (queue, func, key) => {
  try {
    const conn = await amqp.connect(AMQP_URI)
    const channel = await conn.createChannel()
    await channel.assertExchange(exchange, 'topic', assertExchangeOptions)
    await channel.assertQueue(queue, assertQueueOptions)
    await channel.bindQueue(queue, exchange, key)
    await channel.consume(
      queue,
      (msg) => {
        func(msg.content.toString())
        channel.ack(msg)
      },
      consumeQueueOptions
    )
    return channel
  } catch (error) {
    throw new MessageBrokerError(error.message)
  }
}

export default consumer

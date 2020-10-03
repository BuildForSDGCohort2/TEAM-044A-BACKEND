import amqp from 'amqplib'
import AMQP_URI from '../helpers/config'
import { MessageBrokerError } from '../helpers/errors'

const exchange = 'escrow'
const assertExchangeOptions = { durable: true }

const publisher = async (data, routingKey) => {
  try {
    console.log({ AMQP_URI })
    const conn = await amqp.connect(AMQP_URI)
    const channel = await conn.createChannel()
    await channel.assertExchange(exchange, 'topic', assertExchangeOptions)
    return channel.publish(exchange, routingKey, Buffer.from(data))
  } catch (error) {
    throw new MessageBrokerError(error.message)
  }
}

export default publisher

const AMQP_URI =
  process.env.NODE_ENV === 'production'
    ? process.env.CLOUDAMQP_URL
    : 'amqp://localhost'

export default AMQP_URI

export default process.env.NODE_ENV === 'production'
  ? process.env.CLOUDAMQP_URL
  : 'amqp://localhost'

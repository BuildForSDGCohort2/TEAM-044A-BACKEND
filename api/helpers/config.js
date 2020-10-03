import dotenv from 'dotenv'

dotenv.config()

const AMQP_URI = process.env.CLOUDAMQP_URL || 'amqp://localhost'

export function urlGenerator(type, token) {
  switch (type) {
    case 'dashboard':
      return `https://money-guard.herokuapp.com/dashboard`

    case 'signup':
      return `https://money-guard.herokuapp.com/signup`

    case 'login':
      return `https://money-guard.herokuapp.com/login`

    case 'verify':
      return `https://money-guard.herokuapp.com/email/verify/${token}`
    default:
      return `https://money-guard.herokuapp.com/`
  }
}

export default AMQP_URI

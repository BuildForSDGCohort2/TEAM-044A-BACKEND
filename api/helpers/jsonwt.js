import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createToken = (userId) => {
  return jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: '1d' })
}

const sendTokenResponse = (userId) => {
  const token = createToken(userId)
  return JSON.stringify({ token })
}

const decodeToken = (details) => {
  return jwt.decode(details)
}

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET)
}

// const verifyEmailToken = email => {
//   return jwt.sign(email, process.env.JWT_SECRET, {expiresIn:'1d'})
// }

export { createToken, sendTokenResponse, decodeToken, verifyToken }

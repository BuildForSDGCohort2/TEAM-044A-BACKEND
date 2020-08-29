import jwt from 'jsonwebtoken'

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

export { createToken, sendTokenResponse, decodeToken, verifyToken }

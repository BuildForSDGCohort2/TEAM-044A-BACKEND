import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

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

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

const validatePassword = async (password, password2) => {
  const validPassord = await bcrypt.compare(password, password2)
  return validPassord
}

export {
  createToken,
  sendTokenResponse,
  decodeToken,
  verifyToken,
  hashPassword,
  validatePassword
}

/* eslint-disable no-param-reassign */
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { InvalidPropertyError, UnauthorizedError } from '../helpers/errors'
import tryCatchHandler from '../helpers/try-catch-handler'

dotenv.config()

const decodeToken = (controller) => {
  const sendToken = tryCatchHandler(async (httpRequest) => {
    const token = httpRequest.headers['x-auth-token']
    if (!token) {
      throw new UnauthorizedError('No token, authorization denied.')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      throw new InvalidPropertyError('No User with this token exists.')
    }
    httpRequest.user = decoded
    return controller(httpRequest)
  })
  return sendToken
}

export default decodeToken

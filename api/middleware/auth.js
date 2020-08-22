/* eslint-disable no-param-reassign */
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { makeHttpError } from '../helpers/http-response'

dotenv.config()

const decodeToken = (controller) => {
  return async function sendToken(httpRequest) {
    const token = httpRequest.headers['x-auth-token']
    try {
      if (!token) {
        return makeHttpError({
          statusCode: 401,
          title: 'Unauthorized',
          errorMessage: 'No token, authorization denied.'
        })
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      httpRequest.user = decoded
      return controller(httpRequest)
    } catch (error) {
      return makeHttpError({
        statusCode: error.statusCode || 401,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }
}

export default decodeToken

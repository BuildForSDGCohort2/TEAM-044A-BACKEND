/* eslint-disable no-nested-ternary */
import { makeHttpError } from './http-response'
import {
  UniqueConstraintError,
  InvalidPropertyError,
  RequiredParameterError,
  UnauthorizedError
} from './errors'

const tryCatchHandler = (fn) => (req, res, ...otherParams) => {
  return Promise.resolve(fn(req, res, ...otherParams)).catch((error) => {
    return makeHttpError({
      errorMessage: error.message,
      title: error.name,
      stack: error.stack,
      statusCode:
        error instanceof UniqueConstraintError
          ? 409
          : error instanceof InvalidPropertyError ||
            error instanceof RequiredParameterError
          ? 400
          : 500 || error instanceof UnauthorizedError
          ? error.statusCode
          : 401
    })
  })
}

export default tryCatchHandler

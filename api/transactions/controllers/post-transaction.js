/* eslint-disable no-underscore-dangle */
import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makePostTransaction = ({ createTransaction }) => {
  return async function postTransaction(httpRequest) {
    try {
      const { user = {}, source = {}, ...transactionInfo } = httpRequest.body
      user.id = httpRequest.user._id
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer
      }
      const transaction = await createTransaction({
        user,
        source,
        ...transactionInfo
      })
      return onSuccess({
        type: 'transactions',
        attributes: transaction,
        statusCode: 201,
        self: `http://localhost:4000/api/v1/transactions`
      })
    } catch (error) {
      return makeHttpError({
        title: error.name,
        errorMessage: error.message,
        statusCode: error.statusCode || 400,
        stack: error.stack
      })
    }
  }
}

export default makePostTransaction

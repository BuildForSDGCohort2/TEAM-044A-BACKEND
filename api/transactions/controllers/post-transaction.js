/* eslint-disable no-underscore-dangle */
import {
  makeHttpError,
  onSuccess,
  apiResponse
} from '../../helpers/http-response'

const makePostTransaction = ({ createTransaction }) => {
  return async function postTransaction(httpRequest) {
    try {
      const { source = {}, ...transactionInfo } = httpRequest.body
      const { user } = httpRequest
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
      return apiResponse({
        status: true,
        message: 'Transaction Created',
        data: [{ transaction }],
        statusCode: 201
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

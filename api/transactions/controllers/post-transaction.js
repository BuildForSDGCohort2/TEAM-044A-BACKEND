/* eslint-disable no-underscore-dangle */
import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostTransaction = ({ createTransaction }) => {
  const postTransaction = tryCatchHandler(async (httpRequest) => {
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
  })
  return postTransaction
}

export default makePostTransaction

import { makeHttpError, apiResponse } from '../../helpers/http-response'

const makePostRejectTransaction = ({ rejectTransactionRequest }) => {
  return async function postAcceptTransaction(httpRequest) {
    try {
      const { ref } = httpRequest.pathParams

      await rejectTransactionRequest({ ref })
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Transaction Rejected',
        data: null
      })
    } catch (error) {
      return makeHttpError({
        statusCode: error.statusCode || 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }
}

export default makePostRejectTransaction

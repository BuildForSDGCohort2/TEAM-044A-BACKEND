import { makeHttpError, apiResponse } from '../../helpers/http-response'

const makePostConfirmTransaction = ({ confirmTransaction }) => {
  return async function postConfirmTransaction(httpRequest) {
    try {
      const { user } = httpRequest
      const { ref } = httpRequest.pathParams

      await confirmTransaction({ user, ref })
      return apiResponse({
        status: true,
        message: 'Transaction Delivery Confirmed',
        data: null,
        statusCode: 200
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

export default makePostConfirmTransaction

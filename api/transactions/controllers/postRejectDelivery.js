import { makeHttpError, apiResponse } from '../../helpers/http-response'

const makePostRejectDeliveredTransaction = ({ rejectDeliveredTransaction }) => {
  return async function postRejectDelivery(httpRequest) {
    try {
      const { ref } = httpRequest.pathParams

      await rejectDeliveredTransaction({ ref })
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Transaction Delivery Rejected',
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

export default makePostRejectDeliveredTransaction

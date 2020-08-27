import { makeHttpError, apiResponse } from '../../helpers/http-response'

const makePostDeliveryTransaction = ({ deliveryComplete }) => {
  return async function postDeliverTransaction(httpRequest) {
    try {
      const { user } = httpRequest
      console.log('USER', user)
      const { ref } = httpRequest.pathParams

      await deliveryComplete({ user, ref })
      return apiResponse({
        status: true,
        message: 'Transaction Delivered',
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

export default makePostDeliveryTransaction

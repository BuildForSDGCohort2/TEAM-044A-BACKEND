import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostDeliveryTransaction = ({ deliveryComplete }) => {
  const postDeliverTransaction = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await deliveryComplete({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction Delivered',
      data: null,
      statusCode: 200
    })
  })
  return postDeliverTransaction
}

export default makePostDeliveryTransaction

import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostRejectDeliveredTransaction = ({ rejectDeliveredTransaction }) => {
  const postRejectDelivery = tryCatchHandler(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    await rejectDeliveredTransaction({ ref })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Delivery Rejected',
      data: null
    })
  })
  return postRejectDelivery
}

export default makePostRejectDeliveredTransaction

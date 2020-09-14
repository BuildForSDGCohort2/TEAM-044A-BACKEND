import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostConfirmTransaction = ({ confirmTransaction }) => {
  const postConfirmTransaction = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await confirmTransaction({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction Delivery Confirmed',
      data: null,
      statusCode: 200
    })
  })

  return postConfirmTransaction
}

export default makePostConfirmTransaction

import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostVerifyTransaction = ({ verifyTransaction }) => {
  const postVerifyTransaction = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const { ...details } = httpRequest.body

    await verifyTransaction({ user, ...details })
    return apiResponse({
      status: true,
      message: 'Payment Successful',
      data: null,
      statusCode: 200
    })
  })

  return postVerifyTransaction
}

export default makePostVerifyTransaction

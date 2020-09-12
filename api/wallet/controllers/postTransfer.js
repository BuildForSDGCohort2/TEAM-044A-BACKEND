import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostTransfer = ({ walletTransfer }) => {
  const postTransfer = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const { ...walletDetails } = httpRequest.body

    await walletTransfer({ user, ...walletDetails })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Transfer successful',
      data: null
    })
  })
  return postTransfer
}

export default makePostTransfer

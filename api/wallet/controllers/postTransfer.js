import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostTransfer = ({ walletTransfer }) => {
  return tryCatchHandler(async (httpRequest) => {
    const { id } = httpRequest.user
    const { ...walletDetails } = httpRequest.body

    await walletTransfer({ id, ...walletDetails })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Transfer successful',
      data: null
    })
  })
}

export default makePostTransfer

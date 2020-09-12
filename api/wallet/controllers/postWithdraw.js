import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostWithdraw = ({ walletWithdraw }) => {
  const postWithdraw = tryCatchHandler(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest

    await walletWithdraw({ user, ...walletDetails })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Withdrawal Successful',
      data: null
    })
  })
  return postWithdraw
}

export default makePostWithdraw

import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostDeposit = ({ walletDeposit }) => {
  const postDeposit = tryCatchHandler(async (httpRequest) => {
    const { ...walletDetails } = httpRequest.body
    const { user } = httpRequest
    const userId = user.id
    const deposit = await walletDeposit({ ...walletDetails, userId })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Deposit successful',
      data: [{ deposit }]
    })
  })
  return postDeposit
}

export default makePostDeposit

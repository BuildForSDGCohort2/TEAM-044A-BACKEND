import tryCatchHandler from '../../helpers/try-catch-handler'
import { apiResponse } from '../../helpers/http-response'

const makeGetWalletHistory = ({ walletHistory }) => {
  return tryCatchHandler(async (httpRequest) => {
    const { id } = httpRequest.user
    const wallet = await walletHistory({ id })
    return apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: wallet
    })
  })
}

export default makeGetWalletHistory

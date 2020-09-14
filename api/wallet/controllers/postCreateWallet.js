import tryCatchHandler from '../../helpers/try-catch-handler'
import { apiResponse } from '../../helpers/http-response'

const makePostCreateWallet = ({ createWallet }) => {
  const postWallet = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const wallet = await createWallet({ user })
    return apiResponse({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: [{ wallet }]
    })
  })
  return postWallet
}

export default makePostCreateWallet

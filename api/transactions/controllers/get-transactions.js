import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makeGetTransactions = ({ listTransactions }) => {
  return tryCatchHandler(async (httpRequest) => {
    const { id } = httpRequest.user
    const transactions = await listTransactions({ id })
    return apiResponse({
      status: true,
      message: 'Transactions',
      data: [transactions],
      statusCode: 200
    })
  })
}

export default makeGetTransactions

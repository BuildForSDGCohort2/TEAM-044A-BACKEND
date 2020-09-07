import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makeGetTransactions = ({ listTransactions }) => {
  const getTransactions = tryCatchHandler(async (httpRequest) => {
    const { ref } = httpRequest.pathParams
    const { sent, recieved, all } = httpRequest.query
    let transactions
    switch (httpRequest.query) {
      case sent:
        transactions = await listTransactions({ sent })
        break
      case recieved:
        transactions = await listTransactions({ recieved })
        break
      case all:
        transactions = await listTransactions({ all })
        break
      default:
        transactions = await listTransactions()
    }
    transactions = ref
      ? await listTransactions({ ref: httpRequest.pathParams.ref })
      : await listTransactions()
    return apiResponse({
      status: true,
      message: 'Transactions',
      data: [{ transactions }],
      statusCode: 200
    })
  })

  return getTransactions
}

export default makeGetTransactions

import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makeGetTransactions = ({ listTransactions }) => {
  return tryCatchHandler(async (httpRequest) => {
    const { id } = httpRequest.user
    // const { sent, recieved, all } = httpRequest.query
    // let transactions
    // switch (httpRequest.query) {
    //   case sent:
    //     transactions = await listTransactions({ sent })
    //     break
    //   case recieved:
    //     transactions = await listTransactions({ recieved })
    //     break
    //   case all:
    //     transactions = await listTransactions({ all })
    //     break
    //   default:
    //     transactions = await listTransactions()
    // }
    // transactions = ref
    //   ? await listTransactions({ ref: httpRequest.pathParams.ref })
    //   : await listTransactions()
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

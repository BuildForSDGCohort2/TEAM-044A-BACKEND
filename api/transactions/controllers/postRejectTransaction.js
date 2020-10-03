import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostRejectTransaction = ({ rejectTransactionRequest }) => {
  const postAcceptTransaction = tryCatchHandler(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const transaction = await rejectTransactionRequest({ ref })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Rejected',
      data: transaction
    })
  })
  return postAcceptTransaction
}

export default makePostRejectTransaction

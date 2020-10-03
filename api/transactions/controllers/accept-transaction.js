import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

/**
 * Accept Transaction Controller - Responsible for sending a POST request
 * Required - Transaction Reference Id
 * @function makePostAcceptTransaction
 * @returns {object}
 */
const makePostAcceptTransaction = ({ acceptTransaction }) => {
  const postAcceptTransaction = tryCatchHandler(async (httpRequest) => {
    const { ref } = httpRequest.pathParams

    const result = await acceptTransaction({ ref })
    console.log(result)
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Transaction Accepted',
      data: result
    })
  })
  return postAcceptTransaction
}

export default makePostAcceptTransaction

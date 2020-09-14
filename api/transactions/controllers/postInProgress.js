import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostInProgress = ({ inProgress }) => {
  const postInProgress = tryCatchHandler(async (httpRequest) => {
    const { user } = httpRequest
    const { ref } = httpRequest.pathParams

    await inProgress({ user, ref })
    return apiResponse({
      status: true,
      message: 'Transaction in Progress',
      statusCode: 200,
      data: null
    })
  })
  return postInProgress
}

export default makePostInProgress

import { makeHttpError, apiResponse } from '../../helpers/http-response'

const makePostInProgress = ({ inProgress }) => {
  return async function postInProgress(httpRequest) {
    try {
      const { user } = httpRequest
      const { ref } = httpRequest.pathParams

      await inProgress({ user, ref })
      return apiResponse({
        status: true,
        message: 'Transaction in Progress',
        statusCode: 200,
        data: null
      })
    } catch (error) {
      return makeHttpError({
        statusCode: error.statusCode || 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }
}

export default makePostInProgress

import { apiResponse, makeHttpError } from '../../helpers/http-response'

const makePatchDispute = ({ editDispute }) => {
  return async function patchDispute(httpRequest) {
    try {
      const { ...changes } = httpRequest.body
      const { id } = httpRequest.pathParams
      await editDispute({ id, ...changes })
      return apiResponse({
        status: true,
        message: 'Dispute Updated',
        data: null,
        statusCode: 200
      })
    } catch (error) {
      return makeHttpError({
        statusCode: 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }
}

export default makePatchDispute

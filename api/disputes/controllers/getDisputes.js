import { apiResponse, makeHttpError } from '../../helpers/http-response'

const makeGetDisputes = ({ listDisputes }) => {
  return async function postDispute(httpRequest) {
    try {
      const { id } = httpRequest.user
      const disputes = await listDisputes({ id })
      return apiResponse({
        status: true,
        message: 'Transaction Disputes',
        data: [disputes],
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

export default makeGetDisputes

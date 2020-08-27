import { makeHttpError, apiResponse } from '../../helpers/http-response'

/**
 * Accept Transaction Controller - Responsible for sending a POST request
 * Required - Transaction Reference Id
 * @function makePostAcceptTransaction
 * @returns {object}
 */
const makePostAcceptTransaction = ({ acceptTransaction }) => {
  return async function postAcceptTransaction(httpRequest) {
    try {
      const { ref } = httpRequest.pathParams

      await acceptTransaction({ ref })
      return apiResponse({
        status: true,
        statusCode: 200,
        message: 'Transaction Accepted',
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

export default makePostAcceptTransaction

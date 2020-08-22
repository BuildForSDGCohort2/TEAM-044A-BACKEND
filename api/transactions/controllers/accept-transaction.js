import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makePostAcceptTransaction = ({ acceptTransaction }) => {
  return async function postAcceptTransaction(httpRequest) {
    try {
      const { user } = httpRequest
      const { ref } = httpRequest.pathParams

      const toPost = await acceptTransaction({ user, ref })
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        statusCode: 200,
        data: JSON.stringify({ toPost })
      }
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

const { onSuccess, makeHttpError } = require('../../helpers/http-response')

const makePostReleaseFunds = ({ releaseFunds }) => {
  return async function postReleaseFunds(httpRequest) {
    try {
      const { referenceId } = httpRequest.pathParams
      const response = await releaseFunds({ referenceId })
      return onSuccess({
        type: 'Money tranfer',
        statusCode: 200,
        self: '/',
        attributes: response
      })
    } catch (error) {
      return makeHttpError({
        statusCode: error.statusCode || 400,
        title: error.name,
        stack: error.stack
      })
    }
  }
}

export default makePostReleaseFunds

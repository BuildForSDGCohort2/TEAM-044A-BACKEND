import { makeHttpError } from '../../helpers/http-response'

const makeGetEmail = ({ verifyEmail }) => {
  return async function getEmail(httpRequest) {
    try {
      const { ...details } = httpRequest.pathParams
      const redirect = '/api/v1/users'
      const user = await verifyEmail({ ...details })
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        data: user,
        statusCode: 200,
        redirect
      }
    } catch (error) {
      return makeHttpError({
        title: error.name,
        errorMessage: error.message,
        statusCode: error.statusCode || 400,
        stack: error.stack
      })
    }
  }
}

export default makeGetEmail

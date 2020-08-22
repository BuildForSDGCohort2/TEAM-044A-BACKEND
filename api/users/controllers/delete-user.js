import { makeHttpError } from '../../helpers/http-response'

const makeDeleteUser = ({ removeUser }) => {
  return async function deleteUser(httpRequest) {
    try {
      const { id } = httpRequest.pathParams
      const deleted = await removeUser({ id })
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        statusCode: 200,
        data: JSON.stringify(deleted)
      }
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

export default makeDeleteUser

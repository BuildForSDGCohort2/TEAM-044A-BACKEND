import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makeGetUser = ({ listUser }) => {
  return async function getUser(httpRequest) {
    console.log('HTTPrequest', httpRequest)
    try {
      const user = await listUser({ id: httpRequest.user.id })
      return onSuccess({
        type: 'user',
        attributes: user,
        statusCode: 200,
        self: `http://localhost:4000/api/v1/users`
      })
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

export default makeGetUser

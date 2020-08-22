/* eslint-disable no-underscore-dangle */
import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makePatchUser = ({ editUser }) => {
  return async function patchUser(httpRequest) {
    try {
      // eslint-disable-next-line prefer-const
      let { ...userInfo } = httpRequest.body
      if (typeof httpRequest.body === 'string') {
        try {
          userInfo = JSON.parse(userInfo)
        } catch {
          return makeHttpError({
            statusCode: 403,
            errorMessage: 'Bad request. POST body must be valid JSON'
          })
        }
      }

      const toEdit = { ...userInfo, id: httpRequest.pathParams.id }
      const user = await editUser(toEdit)
      return onSuccess({
        type: 'users',
        // id: httpRequest.pathParams
        attributes: user,
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

export default makePatchUser

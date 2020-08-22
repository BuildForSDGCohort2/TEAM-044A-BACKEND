/* eslint-disable prefer-const */
import { onSuccess, makeHttpError } from '../../helpers/http-response'

const makePostUser = ({ addUser }) => {
  return async function postUser(httpRequest) {
    try {
      let { source = {}, ...userInfo } = httpRequest.body
      source.ip = httpRequest.ip
      source.browser = httpRequest.headers['User-Agent']
      if (httpRequest.headers.Referer) {
        source.referrer = httpRequest.headers.Referer
      }

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

      const user = await addUser({ source, ...userInfo })
      return onSuccess({
        type: 'users',
        attributes: user,
        statusCode: 201,
        self: `http://localhost:3000/api/v1/users`,
        location: `http://localhost:3000/api/v1/users`
      })
    } catch (error) {
      return makeHttpError({
        title: error.name,
        errorMessage: error.message,
        statusCode: 400,
        stack: error.stack
      })
    }
  }
}

export default makePostUser

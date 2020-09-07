/* eslint-disable prefer-const */
import { onSuccess, makeHttpError } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostUser = ({ addUser }) => {
  const postUser = tryCatchHandler(async (httpRequest) => {
    let { ...userInfo } = httpRequest.body
    let { source = {} } = httpRequest
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
  })

  return postUser
}

export default makePostUser

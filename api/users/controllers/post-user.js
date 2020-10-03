/* eslint-disable prefer-const */
import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostUser = ({ addUser }) => {
  return tryCatchHandler(async (httpRequest) => {
    let { source = {}, ...userInfo } = httpRequest.body
    source.ip = httpRequest.ip
    source.browser = httpRequest.headers['User-Agent']
    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer
    }

    const user = await addUser({ source, ...userInfo })

    return apiResponse({
      status: true,
      statusCode: 201,
      data: [user],
      message: 'User created'
    })
  })
}

export default makePostUser

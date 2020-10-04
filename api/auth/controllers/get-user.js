import { apiResponse } from '../../helpers/http-response'
import tryCatchHandler from '../../helpers/try-catch-handler'

const makeGetUser = ({ listUser }) => {
  return tryCatchHandler(async (httpRequest) => {
    const user = await listUser({ id: httpRequest.user.id })
    return apiResponse({
      status: 'OK',
      statusCode: 200,
      message: 'Authorized',
      data: [user]
    })
  })
}

export default makeGetUser

import tryCatchHandler from '../../helpers/try-catch-handler'

const makePostLogin = ({ loginUser }) => {
  return tryCatchHandler(async (httpRequest) => {
    const { ...userInfo } = httpRequest.body
    const token = await loginUser({ ...userInfo })
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      status: 'OK',
      statusCode: 200,
      message: 'Authorized',
      data: token
    }
  })
}

export default makePostLogin

import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makePostPayment = ({ sendMoney }) => {
  return async function postPayment(httpRequest) {
    console.log(httpRequest)
    try {
      const { user } = httpRequest
      const { ref } = httpRequest.pathParams
      const toAdd = await sendMoney({ ref, user })
      return onSuccess({
        type: 'payments',
        attributes: toAdd,
        statusCode: 200
      })
    } catch (error) {
      return makeHttpError({
        statusCode: 400,
        errorMessage: error.message,
        title: error.name,
        stack: error.stack
      })
    }
  }
}

export default makePostPayment

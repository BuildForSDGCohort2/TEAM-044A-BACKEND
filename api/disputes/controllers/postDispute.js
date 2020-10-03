import { apiResponse, makeHttpError } from '../../helpers/http-response'

const makePostDispute = ({ addDispute }) => {
  return async function postDispute(httpRequest) {
    try {
      const { id } = httpRequest.user
      let userId = id
      const { ...disputeInfo } = httpRequest.body
      const dispute = await addDispute({ userId, ...disputeInfo })
      return apiResponse({
        status: true,
        message: 'Dispute Created',
        data: dispute,
        statusCode: 201
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

export default makePostDispute

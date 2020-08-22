import { makeHttpError, onSuccess } from '../../helpers/http-response'

const makeGetTransactions = ({ listTransactions }) => {
  return async function getTransactions(httpRequest) {
    try {
      const { ref } = httpRequest.pathParams
      const { sent, recieved, all } = httpRequest.query
      let result
      switch (httpRequest.query) {
        case sent:
          result = await listTransactions({ sent })
          break
        case recieved:
          result = await listTransactions({ recieved })
          break
        case all:
          result = await listTransactions({ all })
          break
        default:
          result = await listTransactions()
      }
      result = ref
        ? await listTransactions({ ref: httpRequest.pathParams.ref })
        : await listTransactions()
      return onSuccess({
        type: 'transactions',
        attributes: result,
        self: `http://localhost:4000/api/v1/transactions`,
        statusCode: 200
      })
    } catch (error) {
      return makeHttpError({
        statusCode: error.statusCode || 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      })
    }
  }
}

export default makeGetTransactions

import makeExpressCallback from '../express'
import {
  postTransaction,
  getTransactions,
  postAcceptTransaction
} from '../transactions/controllers'

export const path = '/api/v1/transactions'
export function config(router) {
  router
    .get('/', makeExpressCallback(getTransactions))
    .post('/', makeExpressCallback(postTransaction))
    .get('/:ref', makeExpressCallback(getTransactions))
    .post(
      '/accept-transaction/:ref',
      makeExpressCallback(postAcceptTransaction)
    )
  return router
}

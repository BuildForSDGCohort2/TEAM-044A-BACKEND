import makeExpressCallback from '../express'
import {
  postTransaction,
  getTransactions,
  postAcceptTransaction,
  rejectTransactions,
  postDeliverTransaction,
  postConfirmTransaction,
  postInProgress,
  postRejectDelivery
} from '../transactions/controllers'

export const path = '/api/v1/transactions'
export function config(router) {
  router
    .get('/', makeExpressCallback(getTransactions))
    .get('/:ref', makeExpressCallback(getTransactions))
    .post('/', makeExpressCallback(postTransaction))
    .post(
      '/accept-transaction/:ref',
      makeExpressCallback(postAcceptTransaction)
    )
    .post('/reject-delivery/:ref', makeExpressCallback(postRejectDelivery))
    .post('/reject/:ref', makeExpressCallback(rejectTransactions)) // reject initial transaction request
    .post('/deliver/:ref', makeExpressCallback(postDeliverTransaction)) // sets transaction status to deliver
    .post('/confirm/:ref', makeExpressCallback(postConfirmTransaction))
    .post('/progress/:ref', makeExpressCallback(postInProgress)) // sets transaction status to in progress
  return router
}

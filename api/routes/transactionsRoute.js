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
    .patch(
      '/accept-transaction/:ref',
      makeExpressCallback(postAcceptTransaction)
    )
    .patch('/reject-delivery/:ref', makeExpressCallback(postRejectDelivery))
    .patch('/reject/:ref', makeExpressCallback(rejectTransactions)) // reject initial transaction request
    .patch('/deliver/:ref', makeExpressCallback(postDeliverTransaction)) // sets transaction status to deliver
    .patch('/confirm/:ref', makeExpressCallback(postConfirmTransaction))
    .patch('/progress/:ref', makeExpressCallback(postInProgress)) // sets transaction status to in progress
  return router
}

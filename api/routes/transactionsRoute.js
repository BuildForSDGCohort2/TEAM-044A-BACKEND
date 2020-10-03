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
import decodeToken from '../middleware/auth'

export const path = '/api/v1/transactions'
export function config(router) {
  router
    .get('/', makeExpressCallback(decodeToken(getTransactions)))
    .post('/', makeExpressCallback(decodeToken(postTransaction)))
    .patch(
      '/accept-transaction/:ref',
      makeExpressCallback(decodeToken(postAcceptTransaction))
    )
    .patch(
      '/reject-delivery/:ref',
      makeExpressCallback(decodeToken(postRejectDelivery))
    )
    .patch('/reject/:ref', makeExpressCallback(decodeToken(rejectTransactions))) // reject initial transaction request
    .patch(
      '/deliver/:ref',
      makeExpressCallback(decodeToken(postDeliverTransaction))
    ) // sets transaction status to deliver
    .patch(
      '/confirm/:ref',
      makeExpressCallback(decodeToken(postConfirmTransaction))
    )
    .patch('/progress/:ref', makeExpressCallback(decodeToken(postInProgress))) // sets transaction status to in progress
  return router
}

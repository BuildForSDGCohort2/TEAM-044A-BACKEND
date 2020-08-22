import makeExpressCallback from '../express'
import { postPayment, postReleaseFunds } from '../core-payment/controllers'

export const path = '/api/v1/payment'

export function config(router) {
  router
    // .post('/:referenceId', makeExpressCallback(postReleaseFunds))
    .post('/:ref', makeExpressCallback(postPayment))
  return router
}

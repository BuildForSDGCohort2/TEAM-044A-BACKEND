import makeExpressCallback from '../express'
import { postPayment, postReleaseFunds } from '../core-payment/controllers'
import {
  createTransaction,
  verifyTransaction
} from '../transactions/use-cases/fundTransaction'

export const path = '/api/v1/payment'

export function config(router) {
  router
    .post('/:ref', makeExpressCallback(postPayment))
    .post('/pay/:referenceId', makeExpressCallback(postReleaseFunds))
    .post('/paystack/pay/:ref', createTransaction)
    .get('/paystack/callback', verifyTransaction)
  return router
}

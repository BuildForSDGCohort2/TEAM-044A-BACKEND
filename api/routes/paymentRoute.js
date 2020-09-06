import {
  createTransaction,
  verifyTransaction
} from '../transactions/use-cases/fundTransaction'

export const path = '/api/v1/payment'

export function config(router) {
  router
    .get('/paystack/callback', verifyTransaction)
    .post('/paystack/pay/:ref', createTransaction)
  return router
}

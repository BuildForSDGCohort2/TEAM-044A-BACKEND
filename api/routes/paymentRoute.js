import makeExpressCallback from '../express'
import { verifyPaystack } from '../transactions/controllers'
import decodeToken from '../middleware/auth'

export const path = '/api/v1/payment'

export function config(router) {
  router.post(
    '/paystack/callback',
    makeExpressCallback(decodeToken(verifyPaystack))
  )
  return router
}

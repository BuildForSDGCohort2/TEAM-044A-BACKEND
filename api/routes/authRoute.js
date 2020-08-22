import makeExpressCallback from '../express'
import { postLogin, getUser } from '../auth/controllers'
import decodeToken from '../middleware/auth'

export const path = '/api/v1/auth'
export function config(router) {
  router
    .get('/', makeExpressCallback(decodeToken(getUser)))
    .post('/', makeExpressCallback(postLogin))
  return router
}

import makeExpressCallback from '../express'
import { postDispute, patchDispute, getDisputes } from '../disputes/controllers'
import decodeToken from '../middleware/auth'

export const path = '/api/v1/disputes'
export function config(router) {
  router
    .post('/', makeExpressCallback(decodeToken(postDispute)))
    .get('/', makeExpressCallback(decodeToken(getDisputes)))
    .get('/:id', makeExpressCallback(decodeToken(getDisputes)))
    .patch('/:id', makeExpressCallback(decodeToken(patchDispute)))
  return router
}

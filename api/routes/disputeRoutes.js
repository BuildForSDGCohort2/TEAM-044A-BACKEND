import makeExpressCallback from '../express'
import { postDispute, patchDispute, getDisputes } from '../disputes/controllers'

export const path = '/api/v1/disputes'
export function config(router) {
  router
    .post('/', makeExpressCallback(postDispute))
    .get('/', makeExpressCallback(getDisputes))
    .get('/:id', makeExpressCallback(getDisputes))
    .patch('/:id', makeExpressCallback(patchDispute))
  return router
}

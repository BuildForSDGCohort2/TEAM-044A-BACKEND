import makeExpressCallback from '../express'
import { postUser } from '../users/controllers'

export const path = '/api/v1/users'
export function config(router) {
  router
    .get('/', (req, res) => res.json({ msg: 'Hello' }))
    .post('/', makeExpressCallback(postUser))
  return router
}

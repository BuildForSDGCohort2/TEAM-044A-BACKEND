import makeExpressCallback from '../express'
import getMail from '../mail/controllers'

export const path = '/api/v1/email'
export function config(router) {
  router
    .get('/verify/:token', makeExpressCallback(getMail))
    .get('/verify', (req, res) => res.json({ status: 'OK' }))
  return router
}

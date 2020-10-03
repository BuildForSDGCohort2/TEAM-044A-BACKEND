import makeExpressCallback from '../express'
import {
  postWallet,
  postDeposit,
  postTransfer,
  postWithdraw,
  getHistory
} from '../wallet/controllers'
import decodeToken from '../middleware/auth'

export const path = '/api/v1/wallet'
export function config(router) {
  router
    .get('/history', makeExpressCallback(decodeToken(getHistory)))
    .post('/', makeExpressCallback(decodeToken(postWallet)))
    .post('/deposit', makeExpressCallback(decodeToken(postDeposit)))
    .post('/transfer', makeExpressCallback(decodeToken(postTransfer)))
    .post('/withdraw', makeExpressCallback(decodeToken(postWithdraw)))
  return router
}

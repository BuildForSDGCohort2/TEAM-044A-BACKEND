/* eslint-disable import/prefer-default-export */
import createNewWallet from './createWallet'
import makeWalletDeposit from './walletDeposit'
import makeWalletTransfer from './walletTransfer'
import makeWalletWithdrawal from './walletWithdraw'
import makeWalletHistory from './walletHistory'
import walletDb from '../models'
import usersDb from '../../users/model'

const createWallet = createNewWallet({ walletDb, usersDb })
const walletDeposit = makeWalletDeposit({ walletDb })
const walletTransfer = makeWalletTransfer({ walletDb, usersDb })
const walletWithdraw = makeWalletWithdrawal({ walletDb })
const walletHistory = makeWalletHistory({ walletDb, usersDb })

export {
  createWallet,
  walletDeposit,
  walletTransfer,
  walletWithdraw,
  walletHistory
}

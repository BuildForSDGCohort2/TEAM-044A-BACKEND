import makePostCreateWallet from './postCreateWallet'
import makePostDeposit from './postDeposit'
import makePostTransfer from './postTransfer'
import makePostWithdraw from './postWithdraw'
import makeGetWalletHistory from './getHistory'
import {
  createWallet,
  walletDeposit,
  walletTransfer,
  walletWithdraw,
  walletHistory
} from '../use-cases'

const postWallet = makePostCreateWallet({ createWallet })
const postDeposit = makePostDeposit({ walletDeposit })
const postTransfer = makePostTransfer({ walletTransfer })
const postWithdraw = makePostWithdraw({ walletWithdraw })
const getHistory = makeGetWalletHistory({ walletHistory })

export { postWallet, postDeposit, postTransfer, postWithdraw, getHistory }

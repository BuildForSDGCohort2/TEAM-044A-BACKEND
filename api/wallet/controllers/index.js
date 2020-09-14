import makePostCreateWallet from './postCreateWallet'
import makePostDeposit from './postDeposit'
import makePostTransfer from './postTransfer'
import makePostWithdraw from './postWithdraw'
import {
  createWallet,
  walletDeposit,
  walletTransfer,
  walletWithdraw
} from '../use-cases'

const postWallet = makePostCreateWallet({ createWallet })
const postDeposit = makePostDeposit({ walletDeposit })
const postTransfer = makePostTransfer({ walletTransfer })
const postWithdraw = makePostWithdraw({ walletWithdraw })

export { postWallet, postDeposit, postTransfer, postWithdraw }

import { v4 as uuidv4 } from 'uuid'
import buildMakeWalletFactory from './walletFactory'

const makeWallet = buildMakeWalletFactory({ uuidv4 })
export default makeWallet

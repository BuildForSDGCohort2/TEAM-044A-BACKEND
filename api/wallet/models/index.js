import makeWalletDb from './walletDb'
import models from '../../database/models'
import usersDb from '../../users/model'

const { Wallet, WalletTransaction } = models

const walletDb = makeWalletDb({ WalletTransaction, usersDb, Wallet })

export default walletDb

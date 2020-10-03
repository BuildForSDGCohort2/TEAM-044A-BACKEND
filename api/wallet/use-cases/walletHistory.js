const { InvalidPropertyError } = require('../../helpers/errors')

const makeWalletHistory = ({ walletDb, usersDb }) => {
  return async function walletHistory({ id }) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidPropertyError('User does not exist.')
    }

    const wallet = await walletDb.findUserById({ id })
    if (!wallet) {
      throw new InvalidPropertyError('Wallet does not exist')
    }

    return wallet
  }
}

export default makeWalletHistory

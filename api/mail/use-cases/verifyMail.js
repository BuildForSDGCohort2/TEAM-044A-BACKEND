import { InvalidPropertyError } from '../../helpers/errors'

const makeVerifyEmail = ({ decodeToken, transactionDb }) => {
  return async function verifyEmail({ ...details } = {}) {
    const toDecode = decodeToken(details.token)
    let { emailVerified, id } = toDecode
    if (!emailVerified) {
      emailVerified = true
      return transactionDb.update({
        emailVerified,
        id
      })
    }
    throw new InvalidPropertyError('Email has been verified already')
  }
}

export default makeVerifyEmail

/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const makeVerifyEmail = ({ decodeToken, transactionDb }) => {
  return async function verifyEmail({ ...details } = {}) {
    const toDecode = decodeToken(details.token)
    let { emailVerified, id } = toDecode
    emailVerified = true
    return await transactionDb.update({
      emailVerified,
      id
    })
  }
}

export default makeVerifyEmail

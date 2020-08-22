/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
const makeVerifyEmail = ({ decodeToken, transactionDb }) => {
  return async function verifyEmail({ ...details } = {}) {
    const toDecode = decodeToken(details.token)
    const transactionId = toDecode.id
    let verificationStatus = toDecode.emailVerified
    verificationStatus = true
    return await transactionDb.update({
      emailVerified: verificationStatus,
      id: transactionId
    })
  }
}

export default makeVerifyEmail

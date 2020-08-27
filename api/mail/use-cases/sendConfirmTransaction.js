/* eslint-disable no-return-await */
const makeConfirmEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  confirmEmailTemplate
}) => {
  return async function sendConfirmEmail({ ref, user }) {
    const sender = user
    const receiver = await transactionDb.findByRef({ ref })
    const transactionRef = receiver.reference
    const {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    } = receiver
    const transaction = {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    }
    const url = dashboardURL(transactionRef)
    const emailTemplate = confirmEmailTemplate(
      receiver,
      sender,
      transaction,
      url
    )
    return await sendMail({ emailTemplate })
  }
}

export default makeConfirmEmail

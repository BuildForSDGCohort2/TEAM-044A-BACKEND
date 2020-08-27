/* eslint-disable no-return-await */
const makeRejectionEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  rejectionEmailTemplate
}) => {
  return async function sendRejectionEmail({ ref, user }) {
    const receiver = await usersDb.findById({ id: user.id })
    const sender = await transactionDb.findByRef({ ref })
    const transactionRef = sender.reference
    const {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    } = sender
    const transaction = {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    }
    const url = dashboardURL(transactionRef)
    const emailTemplate = rejectionEmailTemplate(
      receiver,
      sender,
      transaction,
      url
    )
    return await sendMail({ emailTemplate })
  }
}

export default makeRejectionEmail

/* eslint-disable no-return-await */
const makeAcceptanceEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  transactionEmailTemplate
}) => {
  return async function sendAcceptanceEmail({ transactionId, user }) {
    const sender = user.firstName
    const receiver = await transactionDb.findById({ id: transactionId })
    const transactionRef = receiver.reference
    const transaction = {
      transactionTitle: receiver.transactionTitle,
      transactionDesc: receiver.transactionDesc,
      amount: receiver.amount,
      transactionStatus: receiver.transactionStatus
    }
    const url = dashboardURL(transactionRef)
    const emailTemplate = transactionEmailTemplate(
      receiver,
      sender,
      transaction,
      url
    )
    return await sendMail({ emailTemplate })
  }
}

export default makeAcceptanceEmail

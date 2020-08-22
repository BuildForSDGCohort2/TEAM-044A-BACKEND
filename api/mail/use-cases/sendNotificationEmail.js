/* eslint-disable no-return-await */
const makeSendNotificationEmail = ({
  transactionDb,
  sendMail,
  dashboard,
  acceptanceEmailTemplate
}) => {
  return async function sendNotificationEmail({ ref, user }) {
    const receiver = await transactionDb.findByRef({ ref })
    const transactionRef = receiver.reference
    const transaction = {
      transactionTitle: receiver.transactionTitle,
      transactionDesc: receiver.transactionDesc,
      amount: receiver.amount,
      transactionStatus: receiver.transactionStatus
    }
    const url = dashboard(transactionRef)
    const emailTemplate = acceptanceEmailTemplate(
      receiver,
      user,
      transaction,
      url
    )
    return await sendMail({ emailTemplate })
  }
}

export default makeSendNotificationEmail

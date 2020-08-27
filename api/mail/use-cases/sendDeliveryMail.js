/* eslint-disable no-return-await */
const makeDeliveryEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  deliveryEmailTemplate
}) => {
  return async function sendDeliveryEmail({ ref, user }) {
    const { email, firstName } = user
    const receiver = {
      email,
      firstName
    }
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
    const emailTemplate = deliveryEmailTemplate(
      receiver,
      sender,
      transaction,
      url
    )
    return await sendMail({ emailTemplate })
  }
}

export default makeDeliveryEmail

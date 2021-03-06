import { SendGridError } from '../../helpers/errors'

/* eslint-disable no-return-await */
const makeDeliveryEmail = ({
  transactionDb,
  sendMail,
  usersDb,
  dashboardURL,
  deliveryEmailTemplate
}) => {
  return async function sendDeliveryEmail({ ref, initiator }) {
    try {
      const user = await usersDb.findById({ id: initiator })
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
      return sendMail({ emailTemplate })
    } catch (error) {
      throw new SendGridError(error.message)
    }
  }
}

export default makeDeliveryEmail

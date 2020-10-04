import { SendGridError } from '../../helpers/errors'

const makeDeliveryRejectionMail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  deliveryRejectionTemplate
}) => {
  return async function sendDeliveryRejectionEmail({ ref, user }) {
    try {
      const sender = await usersDb.findById({ id: user.id })
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
      const emailTemplate = deliveryRejectionTemplate(
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

export default makeDeliveryRejectionMail

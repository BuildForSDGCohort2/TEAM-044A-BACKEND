import { SendGridError } from '../../helpers/errors'

const makeConfirmEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  confirmEmailTemplate
}) => {
  return async function sendConfirmEmail({ ref, initiator }) {
    try {
      const sender = await usersDb.findById({ id: initiator })
      const receiver = await transactionDb.findByRef({ ref })
      // const transactionRef = receiver.reference
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
      const url = dashboardURL()
      const emailTemplate = confirmEmailTemplate(
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

export default makeConfirmEmail

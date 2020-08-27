/* eslint-disable no-return-await */
const makeAcceptanceEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  transactionEmailTemplate
}) => {
  return async function sendAcceptanceEmail({ _id, initiator }) {
    try {
      /**
       * The initiator of the transaction is meant to get the email stating the recipient has accepted.
       * The initiator in this case is the incoming user object.
       */
      const receiver = await usersDb.findById({ id: initiator })
      const transactionDetails = await transactionDb.findById({
        id: _id
      })
      const {
        transactionTitle,
        transactionDesc,
        amount,
        reference,
        email,
        transactionStatus
      } = transactionDetails
      const transactionRef = reference
      const sender = await usersDb.findByEmail({ email })
      const transaction = {
        transactionTitle,
        transactionDesc,
        amount,
        transactionStatus
      }
      const url = dashboardURL(transactionRef)
      const emailTemplate = transactionEmailTemplate(
        receiver,
        sender,
        transaction,
        url
      )
      return await sendMail({ emailTemplate })
    } catch (error) {
      console.error(error)
    }
  }
}

export default makeAcceptanceEmail

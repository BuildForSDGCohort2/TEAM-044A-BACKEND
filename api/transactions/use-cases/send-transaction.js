/* eslint-disable consistent-return */
/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */

const buildMakeSendTransaction = ({
  transactionDb,
  usersDb,
  sendMail,
  createToken,
  getTransactionEmailURL,
  transactionEmailTemplate
}) => {
  return async function sendTransaction({ newTransaction, user }) {
    try {
      const sender = await usersDb.findById({ id: user.id })
      const receiver = await transactionDb.findById({ id: newTransaction._id })
      const toSend = {
        id: receiver._id,
        email: receiver.email,
        emailVerified: receiver.emailVerified
      }
      const transactionRef = createToken(toSend)
      // const transactionRef = receiver.reference
      const transaction = {
        title: receiver.transactionTitle,
        transactionDesc: receiver.transactionDesc,
        amount: receiver.amount
      }
      const url = getTransactionEmailURL(transactionRef)
      const emailTemplate = transactionEmailTemplate(
        receiver,
        sender,
        transaction,
        url
      )
      return await sendMail({ emailTemplate })
    } catch (error) {
      console.log(error)
    }
  }
}

export default buildMakeSendTransaction

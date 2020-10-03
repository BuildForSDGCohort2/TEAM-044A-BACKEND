import makeTransaction from '../factory'
// import publisher from '../../pubsub/publisher'
// import consumer from '../../pubsub/subscriber'
// import { sendTransactionMail } from '../../mail'

const makeBuildCreateTransaction = ({ transactionDb, sendTransactionMail }) => {
  return async function createTransaction({ user, ...transactionInfo } = {}) {
    const { id } = user
    const transaction = makeTransaction({ ...transactionInfo })
    const transactionSource = transaction.getSource()
    const newTransaction = await transactionDb.insert({
      firstName: transaction.getFirstName(),
      lastName: transaction.getLastName(),
      phoneNumber: transaction.getPhoneNumber(),
      email: transaction.getEmail(),
      transactionTitle: transaction.getTitle(),
      transactionDesc: transaction.getDesc(),
      currency: transaction.getCurrency(),
      amount: transaction.getAmount(),
      inspectionPeriod: transaction.getInspectionPeriod(),
      dueDate: transaction.getDueDate(),
      reference: transaction.getRef(),
      initiator: id,
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },
      user
    })
    // const transactionId = newTransaction._id
    // const userId = user.id
    // await publisher(transactionId.toString(), userId, 'newtransaction.transaction_email')
    // await consumer(
    //   'transaction_email_queue',
    //   sendTransactionMail,
    //   '*.transaction_email'
    // )
    await sendTransactionMail({ newTransaction, user })
    return newTransaction
  }
}

export default makeBuildCreateTransaction

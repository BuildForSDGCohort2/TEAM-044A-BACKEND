import makeTransaction from '../factory'

const makeBuildCreateTransaction = ({ transactionDb, sendTransactionMail }) => {
  return async function createTransaction({ user, ...transactionInfo } = {}) {
    const { _id } = user
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
      initiator: _id,
      source: {
        ip: transactionSource.getIp(),
        browser: transactionSource.getBrowser(),
        referrer: transactionSource.getReferrer()
      },
      user
    })
    await sendTransactionMail({ newTransaction, user })
    return newTransaction
  }
}

export default makeBuildCreateTransaction

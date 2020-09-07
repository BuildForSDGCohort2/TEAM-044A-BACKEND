import publishToQueue from '../../pubsub/publisher'

const makeConfirmTransaction = ({
  transactionDb,
  sendConfirmEmail
  // DisbursementAPI
}) => {
  return async function confirmTransation({ ref } = {}) {
    const currentTransaction = await transactionDb.findByRef({ ref })
    let { transactionStatus } = currentTransaction
    const { _id, initiator } = currentTransaction
    transactionStatus = 'Buyer confirmed Order'
    const [updated] = await Promise.all([
      transactionDb.update({ id: _id, transactionStatus }),
      sendConfirmEmail({ ref, initiator })
    ])
    const exchange = 'escrow'
    const routingKey = 'disbursement'
    await publishToQueue(exchange, routingKey, _id.toString())
    // const fund = new DisbursementAPI()
    // fund.on('transferMoney', () => {}).releaseFunds({ transactionID: _id })
    return updated
  }
}

export default makeConfirmTransaction

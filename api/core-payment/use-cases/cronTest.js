/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { CronJob } = require('cron')

const automateFundsTransfer = ({
  escrowDb,
  transactionDb,
  usersDb,
  moment
}) => {
  return new CronJob('* * * * * *', async () => {
    try {
      const foundEscrowDoc = await escrowDb.findAll()
      const referenceNumbers = foundEscrowDoc
        .map((acct) => acct.reference)
        .filter((item) => item !== null)

      const sellerIds = foundEscrowDoc
        .map((acct) => acct.sellerInfo.sellerId)
        .filter((item) => item !== null)

      const amountToTransfer = foundEscrowDoc
        .map((el) => el.amount / 100)
        .filter((item) => item !== null)
      sellerIds.forEach(async (id) => {
        // eslint-disable-next-line no-useless-catch
        try {
          const foundSeller = await usersDb.findById({ id })
          referenceNumbers.forEach(async (ref) => {
            const foundRef = await transactionDb.findByRef({ ref })
            if (foundSeller.email === foundRef.email) {
              let { inspectionPeriod } = foundRef
              inspectionPeriod = moment(Date.now())
              if (inspectionPeriod) {
                const cloned = inspectionPeriod
                  .clone()
                  .add(1, 'minutes')
                  .valueOf()
                if (
                  new Date(cloned).getTime() === new Date(Date.now()).getTime()
                ) {
                  amountToTransfer.forEach(async (money) => {
                    await escrowDb.handleMoneyTransfer({
                      referenceId: foundRef.reference,
                      receiverId: foundSeller._id,
                      amount: money
                    })
                  })
                }
              }
            }
          })
        } catch (error) {
          throw error
        }
      })
    } catch (error) {
      // throw error
    }
  })
}

export default automateFundsTransfer

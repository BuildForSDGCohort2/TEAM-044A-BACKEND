/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
const { CronJob } = require('cron')

const automateFundsTransfer = ({
  escrowDb,
  transactionDb,
  usersDb,
  moment,
  sendInspectionPeriodEmail
}) => {
  return new CronJob('* * * * * *', async () => {
    try {
      console.log('I am starting this.')
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
                  new Date(cloned).getTime() >=
                  new Date(inspectionPeriod).getTime()
                ) {
                  console.log('cloned', cloned)
                  amountToTransfer.forEach(async (money) => {
                    console.log('monies', money)
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
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
    }
  })
}

export default automateFundsTransfer

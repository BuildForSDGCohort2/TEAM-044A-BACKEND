/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/**
 *  When I am logged IN, a Cron job is started automatically, XXX doesn't hold up
 *  The cron job callback function is meant to run like this:
 *  1) A cron job is running seperately on a process, which loops through the escrow Database
 *  2) It gets the reference number of each documents in the escrowDb, and then goes to check the transactionDb
 *  3) It looks for transactions that match the reference number, 'Ongoing' transactionStatus, emailVerified status
 *  4) It then checks if the dueDate is TODAY.
 *  5) If it is, It then holds the money further based on the inspectionPeriod found in the transaction document
 *  6) When the inspectionPeriod is equal to TODAY, a notification email is sent to the customer stating that the inspectionPeriod is up.
 *  7) And the customer is meant to goto his/her dashboard to 'CONFIRM TRANSACTIONS'.
 *  8) An extra holding time is set to 24 Hours from the due inspectionPeriod.
 *  9) If after the inspectionPeriod and extra holding time is up and the customer doesn't signify, the escrow has the authority to send the
 *     money to the seller, It will be assumed that the customer has gotten his/her product. Make sense? -- Check it out later.
 *  10) The cronjob is run automatically, every second.
 */

const { CronJob } = require('cron')

const automateFundsTransfer = ({
  escrowDb,
  transactionDb,
  usersDb,
  moment,
  sendInspectionPeriodEmail
}) => {
  return new CronJob('* * * * * *', async () => {
    const foundAccounts = await escrowDb.findAll()
    const referenceNumbers = foundAccounts
      .map((acct) => acct.reference)
      .filter((item) => item)

    const matchingAccounts = await transactionDb.findAll()
    const receiverIdsFromEscrowDb = foundAccounts
      .map((acct) => acct.sellerInfo.sellerId)
      .filter((item) => item) // it comes in an array

    const foundUsers = await usersDb.findAll()
    const recieverIdsFromUserDb = foundUsers
      .map((el) => el._id)
      .filter((item) => item) // it comes in an array

    let receiverId
    let foundSellerIds = []

    for (let i = 0; i < recieverIdsFromUserDb.length; i++) {
      receiverId = recieverIdsFromUserDb[i]
      if (receiverIdsFromEscrowDb.indexOf(receiverId)) {
        foundSellerIds.push(receiverId)
      }
    }

    matchingAccounts.forEach(async (doc) => {
      const found =
        doc.reference ===
          referenceNumbers.filter((item) => item === doc.reference) &&
        doc.transactionStatus === 'Ongoing' &&
        doc.emailVerified === true &&
        doc.dueDate === moment(Date.now()).valueOf()
          ? doc
          : null
      if (found.inspectionPeriod === moment(Date.now()).valueOf()) {
        await sendInspectionPeriodEmail({})
        found.inspectionPeriod = moment().add(24, 'hours')
        if (found.inspectionPeriod === moment(Date.now()).valueOf()) {
          await escrowDb.handleMoneyTransfer({
            referenceId: doc.reference === referenceNumbers, // work on this to be named properly
            receiverId
          })
        }
      }
    })
  })
}

export default automateFundsTransfer

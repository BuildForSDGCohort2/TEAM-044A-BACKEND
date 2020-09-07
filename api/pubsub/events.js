/* eslint-disable max-classes-per-file */

import { EventEmitter } from 'events'
import { CronJob } from 'cron'
import escrowDb from '../core-payment/models'
import transactionDb from '../transactions/models'
import usersDb from '../users/model'

class DisbursementAPI extends EventEmitter {
  constructor() {
    super()
  }

  async releaseFunds({ transactionID }) {
    // get the transaction that is === the transactionID
    const transaction = await escrowDb.findEscrow({ transactionID })
    const {
      totalAmount,
      transactionId,
      escrowCharge,
      _id,
      isCustomerPaid
    } = transaction
    const currentTransaction = await transactionDb.findById({
      id: transactionId
    })
    const { email, inspectionPeriod } = currentTransaction
    const receiver = await usersDb.findByEmail({ email })

    // checks to see if the customer's money has been disbursed before now
    if (isCustomerPaid) {
      throw new Error('The recipient money has been disbursed already.')
    } else if (inspectionPeriod === Date.now()) {
      await escrowDb
        .transferMoney({
          totalAmount,
          transactionId,
          escrowCharge,
          receiver
        })
        .then(async () => {
          const result = await escrowDb.update({
            id: _id,
            isCustomerPaid: true
          })
          return result
        })
    } else {
      runCron(
        new Date(inspectionPeriod),
        totalAmount,
        transactionId,
        escrowCharge,
        receiver,
        _id
      )
    }
    this.emit('transferMoney', transactionId)
    return this
  }
}

function runCron(
  inspectionPeriod,
  totalAmount,
  transactionId,
  escrowCharge,
  receiver,
  _id
) {
  // Setup a cron job that will hold this information and run when the inspectionPeriod is over
  const job = new CronJob(inspectionPeriod, async () => {
    await escrowDb.transferMoney({
      totalAmount,
      transactionId,
      escrowCharge,
      receiver
    })
    await escrowDb.update({
      id: _id,
      isCustomerPaid: true
    })
  })
  return job.start()
}

export const disburse = async (msg) => {
  // get the transaction that is === the transactionID
  const transaction = await escrowDb.findEscrow({ msg })
  const {
    totalAmount,
    transactionId,
    escrowCharge,
    _id,
    isCustomerPaid
  } = transaction
  const currentTransaction = await transactionDb.findById({
    id: transactionId
  })
  const { email } = currentTransaction
  let { inspectionPeriod } = currentTransaction
  const receiver = await usersDb.findByEmail({ email })

  inspectionPeriod = Date.now()
  // checks to see if the customer's money has been disbursed before now
  if (isCustomerPaid) {
    throw new Error('The recipient money has been disbursed already.')
  } else if (inspectionPeriod === Date.now()) {
    await escrowDb
      .transferMoney({
        totalAmount,
        transactionId,
        escrowCharge,
        receiver
      })
      .then(async () => {
        const result = await escrowDb.update({
          id: _id,
          isCustomerPaid: true
        })
        return result
      })
  }
}
export default DisbursementAPI

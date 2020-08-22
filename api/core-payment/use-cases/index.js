import moment from 'moment'
import initiatePayment from './initiatePayment'
import makeReleaseFunds from './releaseFunds'
import { sendNotificationEmail } from '../../mail'
import usersDb from '../../users/model'
import transactionDb from '../../transactions/models'
import escrowDb from '../models'
import { setCronJob } from '../../helpers/utils'

const sendMoney = initiatePayment({
  usersDb,
  transactionDb,
  sendNotificationEmail
})

const releaseFunds = makeReleaseFunds({
  escrowDb,
  usersDb,
  moment,
  setCronJob,
  transactionDb
})

export { sendMoney, releaseFunds }

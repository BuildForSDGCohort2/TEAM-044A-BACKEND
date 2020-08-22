import makeVerifyEmail from './use-cases/verifyMail'
import makeAcceptanceEmail from './use-cases/sendAcceptancemail'
import makeSendNotificationEmail from './use-cases/sendNotificationEmail'
import { decodeToken, sendTokenResponse } from '../helpers/jsonwt'
import transactionDb from '../transactions/models'
import { transactionEmailTemplate, dashboardURL } from './types/acceptanceMail'
import { acceptanceEmailTemplate, dashboard } from './types/sendAcceptanceMail'
import sendMail from './sendMail'

const verifyEmail = makeVerifyEmail({
  decodeToken,
  sendTokenResponse,
  transactionDb
})

// Notifies the buyer that the seller has accepted to be paid XYZ amount
const sendAcceptanceEmail = makeAcceptanceEmail({
  transactionDb,
  transactionEmailTemplate,
  dashboardURL,
  sendMail
})

// Notifies the seller that the money has been paid into escrow
const sendNotificationEmail = makeSendNotificationEmail({
  transactionDb,
  sendMail,
  acceptanceEmailTemplate,
  dashboard
})
export { verifyEmail, sendAcceptanceEmail, sendNotificationEmail }

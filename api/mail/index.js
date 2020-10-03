import makeVerifyEmail from './use-cases/verifyMail'
import makeAcceptanceEmail from './use-cases/sendAcceptancemail'
import makeSendNotificationEmail from './use-cases/sendNotificationEmail'
import makeRejectionEmail from './use-cases/sendRejectionMail'
import makeDeliveryEmail from './use-cases/sendDeliveryMail'
import makeConfirmEmail from './use-cases/sendConfirmTransaction'
import buildMakeSendTransaction from './use-cases/sendCreateTransaction'
import makeInProgressEmail from './use-cases/sendInProgressMail'
import makeDeliveryRejectionMail from './use-cases/deliveryRejectionMail'
import makeSendDisputeMail from './use-cases/sendDisputeMail'
import makeVerifyUser from './use-cases/verifyUser'
import dashboardURL from './use-cases/dashboard'
import { decodeToken, sendTokenResponse, createToken } from '../helpers/jsonwt'
import transactionDb from '../transactions/models'
import sendMail from './sendMail'
import usersDb from '../users/model'
import {
  acceptanceEmailTemplate,
  deliveryEmailTemplate,
  rejectionEmailTemplate,
  transactionEmailTemplate,
  confirmEmailTemplate,
  getTransactionEmailURL,
  createTransactionTemplate,
  inProgressEmailTemplate,
  deliveryRejectionTemplate,
  disputeMailTemplate,
  createVerifyEmailTemplate,
  getUserEmail
} from './types/index'

const verifyUser = makeVerifyUser({
  usersDb,
  createToken,
  createVerifyEmailTemplate,
  sendMail,
  getUserEmail
})
const verifyEmail = makeVerifyEmail({
  decodeToken,
  sendTokenResponse,
  usersDb
})

// Notifies the buyer that the seller has accepted to be paid XYZ amount
const sendAcceptanceEmail = makeAcceptanceEmail({
  transactionDb,
  transactionEmailTemplate,
  dashboardURL,
  sendMail,
  usersDb
})

// Notifies the seller that the money has been paid into escrow
const sendNotificationEmail = makeSendNotificationEmail({
  transactionDb,
  sendMail,
  acceptanceEmailTemplate,
  dashboardURL
})

// Sends rejection mail to the recipient
const sendRejectionMail = makeRejectionEmail({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  rejectionEmailTemplate
})

// Sends mail signifying rejection of shipped product
const sendDeliveryRejectionEmail = makeDeliveryRejectionMail({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  deliveryRejectionTemplate
})

// for creating disputes
const sendDisputeMail = makeSendDisputeMail({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  disputeMailTemplate
})

// sends mail to buyer/initiator of the transaction to signify delivery on its way
const sendDeliveryEmail = makeDeliveryEmail({
  transactionDb,
  usersDb,
  sendMail,
  deliveryEmailTemplate,
  dashboardURL
})

// sends mail to recipient of the transaction to signify confirmation of delivered products
const sendConfirmEmail = makeConfirmEmail({
  transactionDb,
  sendMail,
  dashboardURL,
  confirmEmailTemplate,
  usersDb
})

// sends initial transaction mail to accept or decline
const sendTransactionMail = buildMakeSendTransaction({
  transactionDb,
  usersDb,
  sendMail,
  getTransactionEmailURL,
  createToken,
  createTransactionTemplate
})

const sendInProgressEmail = makeInProgressEmail({
  transactionDb,
  sendMail,
  dashboardURL,
  inProgressEmailTemplate,
  usersDb
})
export {
  verifyEmail,
  sendAcceptanceEmail,
  sendNotificationEmail,
  sendRejectionMail,
  sendDeliveryEmail,
  sendConfirmEmail,
  sendTransactionMail,
  sendInProgressEmail,
  sendDeliveryRejectionEmail,
  sendDisputeMail,
  verifyUser
}

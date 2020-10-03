import transactionEmailTemplate from './acceptanceMail'
import rejectionEmailTemplate from './rejectionEmail'
import acceptanceEmailTemplate from './sendAcceptanceMail'
import deliveryEmailTemplate from './deliveryTemplate'
import confirmEmailTemplate from './confirmMailTemplate'
import inProgressEmailTemplate from './inProgressTemplate'
import deliveryRejectionTemplate from './deliveryRejectTemplate'
import disputeMailTemplate from './disputeMailTemplate'

export * from './transactionMail'
export * from './verifyUserMailTemplate'

export {
  transactionEmailTemplate,
  rejectionEmailTemplate,
  acceptanceEmailTemplate,
  deliveryEmailTemplate,
  confirmEmailTemplate,
  inProgressEmailTemplate,
  deliveryRejectionTemplate,
  disputeMailTemplate
}

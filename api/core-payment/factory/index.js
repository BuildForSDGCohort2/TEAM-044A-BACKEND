import buildMakePayMentDetails from './paymentFactory'
import buildMakeEscrowDetails from './escrowFactory'

const makeEscrow = buildMakeEscrowDetails()
const makePayment = buildMakePayMentDetails()

export { makePayment, makeEscrow }

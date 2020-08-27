import buildMakePayMentDetails from './paymentFactory'
import buildMakeEscrowDetails from './escrowFactory'
import { v4 as uuidv4 } from 'uuid'

const makeEscrow = buildMakeEscrowDetails({ uuidv4 })
const makePayment = buildMakePayMentDetails()

export { makePayment, makeEscrow }

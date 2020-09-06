import { v4 as uuidv4 } from 'uuid'
import buildMakePayMentDetails from './paymentFactory'
import buildMakeEscrowDetails from './escrowFactory'

const makeEscrow = buildMakeEscrowDetails({ uuidv4 })
const makePayment = buildMakePayMentDetails()

export { makePayment, makeEscrow }

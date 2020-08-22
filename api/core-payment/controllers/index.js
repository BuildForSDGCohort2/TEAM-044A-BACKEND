import makePostPayment from './postInitiatePayment'
import makePostReleaseFunds from './post-release-funds'
import { sendMoney, releaseFunds } from '../use-cases'

const postPayment = makePostPayment({ sendMoney })
const postReleaseFunds = makePostReleaseFunds({ releaseFunds })
export { postPayment, postReleaseFunds }

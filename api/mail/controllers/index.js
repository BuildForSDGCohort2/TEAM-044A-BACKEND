import makeGetEmail from './post-verify'
import { verifyEmail } from '../index'

const getMail = makeGetEmail({ verifyEmail })
export default getMail

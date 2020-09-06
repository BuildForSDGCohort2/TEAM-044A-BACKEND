import makeAddDispute from './addDispute'
import makeEditDispute from './editDispute'
import makeListDisputes from './listDisputes'
import disputeDb from '../models'
import transactionDb from '../../transactions/models'
import { sendDisputeMail } from '../../mail'

const addDispute = makeAddDispute({ transactionDb, disputeDb, sendDisputeMail })
const editDispute = makeEditDispute({ transactionDb, disputeDb })
const listDisputes = makeListDisputes({ disputeDb })

export { addDispute, editDispute, listDisputes }

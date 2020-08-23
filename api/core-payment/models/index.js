import makeEscrowDb from './escrowDb'
import Escrow from './escrowModel'
import User from '../../users/model/userModel'
import Transaction from '../../transactions/models/transactionModel'

const escrowDb = makeEscrowDb({ Escrow, User, Transaction })
export default escrowDb

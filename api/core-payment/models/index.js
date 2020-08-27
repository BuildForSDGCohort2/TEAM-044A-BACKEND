import makeEscrowDb from './escrowDb'
import models from '../../database/models'

const { Escrow, User, Transaction } = models

const escrowDb = makeEscrowDb({ Escrow, User, Transaction })
export default escrowDb

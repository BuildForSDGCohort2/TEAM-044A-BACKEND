import models from '../../database/models'
import makeDisputeDb from './disputeDb'

const { Dispute } = models

const disputeDb = makeDisputeDb({ Dispute })

export default disputeDb

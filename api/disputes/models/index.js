import models from '../../database/models'
import makeDisputeDb from './disputeDb'

const { Dispute, User } = models

const disputeDb = makeDisputeDb({ Dispute, User })

export default disputeDb

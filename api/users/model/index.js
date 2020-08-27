import makeUsersDb from './usersDb'
import models from '../../database/models'
import { createToken } from '../../helpers/jsonwt'

const { User } = models

const usersDb = makeUsersDb({ User, createToken })
export default usersDb

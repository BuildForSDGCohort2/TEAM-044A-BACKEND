import makeUsersDb from './usersDb'
import models from '../../database/models'
import { createToken, hashPassword } from '../../helpers/jsonwt'

const { User } = models

const usersDb = makeUsersDb({ User, hashPassword, createToken })
export default usersDb

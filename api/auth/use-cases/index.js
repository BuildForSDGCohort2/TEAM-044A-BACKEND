import makeLoginUser from './login'
import makeGetUser from './get-user'
import { sendTokenResponse } from '../../helpers/jsonwt'
import usersDb from '../../users/model'
import transactionsDb from '../../transactions/models'

const loginUser = makeLoginUser({ usersDb, transactionsDb, sendTokenResponse })
const listUser = makeGetUser({ usersDb, transactionsDb })

export { loginUser, listUser }

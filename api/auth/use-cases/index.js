import makeLoginUser from './login'
import makeGetUser from './get-user'
import { sendTokenResponse } from '../../helpers/jsonwt'
import usersDb from '../../users/model'
import transactionDb from '../../transactions/models'

const loginUser = makeLoginUser({ usersDb, sendTokenResponse })
const listUser = makeGetUser({ usersDb, transactionDb })

export { loginUser, listUser }

import makeAddUser from './add-user'
import makeEditUser from './edit-user'
import makeRemoveUser from './remove-user'
import makeListUser from './list-user'
import usersDb from '../model'
import transactionsDb from '../../transactions/models'

const addUser = makeAddUser({ usersDb, transactionsDb })
const editUser = makeEditUser({ usersDb })
const removeUser = makeRemoveUser({ usersDb })
const listUser = makeListUser({ usersDb })

export { addUser, editUser, removeUser, listUser }

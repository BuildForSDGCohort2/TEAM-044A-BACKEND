import makePostUser from './post-user'
import makeDeleteUser from './delete-user'
import makePatchUser from './patch-user'
import { addUser, removeUser, editUser } from '../use-cases'

const postUser = makePostUser({ addUser })
const deleteUser = makeDeleteUser({ removeUser })
const patchUser = makePatchUser({ editUser })

export { postUser, deleteUser, patchUser }

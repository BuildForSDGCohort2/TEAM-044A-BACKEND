/* eslint-disable no-return-await */
const makeListUser = ({ usersDb }) => {
  return async function listUser({ id } = {}) {
    return await usersDb.findById({ id })
  }
}
export default makeListUser

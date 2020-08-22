const makeRemoveUser = ({ usersDb }) => {
  return async function removeUser({ id } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.')
    }
    const userToDelete = await usersDb.findById({ id })
    async function hardDelete(user) {
      await usersDb.remove(user)
      return {
        deletedCount: 1,
        message: 'User deleted.'
      }
    }

    function deleteNothing() {
      return {
        deletedCount: 0,
        message: 'User not found, nothing to delete.'
      }
    }

    if (!userToDelete) {
      return deleteNothing()
    }

    return hardDelete(userToDelete)
  }
}

export default makeRemoveUser

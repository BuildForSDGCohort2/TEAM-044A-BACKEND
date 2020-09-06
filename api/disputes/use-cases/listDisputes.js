const makeListDisputes = ({ disputeDb }) => {
  return async function listDisputes({ id } = {}) {
    const found = id
      ? await disputeDb.findById({ id })
      : await disputeDb.findAll()
    return found
  }
}

export default makeListDisputes

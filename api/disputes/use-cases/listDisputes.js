const makeListDisputes = ({ disputeDb }) => {
  return async function listDisputes({ id } = {}) {
    const found = await disputeDb.findAll({ id })
    // ? await disputeDb.findById({ id })
    return found
  }
}

export default makeListDisputes

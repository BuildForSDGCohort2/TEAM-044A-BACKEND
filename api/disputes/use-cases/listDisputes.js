const makeListDisputes = ({ disputeDb }) => {
  return async function listDisputes({ id } = {}) {
    return id ? await disputeDb.findById({ id }) : await disputeDb.findAll()
  }
}

export default makeListDisputes

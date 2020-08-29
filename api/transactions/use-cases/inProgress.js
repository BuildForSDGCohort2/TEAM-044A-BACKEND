const makeInProgress = ({ transactionDb, sendInProgressEmail, usersDb }) => {
  return async function inProgress({ user, ref }) {
    /**
     * In order to diffrentiate who's delivering a product or service,
     * We loop through the transasctionsDb and UsersDb, if we find an email that
     * match from both documents, then we know that person is the recipient.
     * The found user can go ahead and make a POST request to state that the product is in transition
     * The status is changed to In- Progress
     */

    const { transactions } = user
    const foundUser = await usersDb.findAll()
    const foundTransaction = await transactionDb.findAll()

    // map through the returned documentss
    const userArr = foundUser
      .map((user) => user.email)
      .filter((user) => user !== null)

    const transactionArr = foundTransaction
      .map((item) => item.email)
      .filter((item) => item !== null)

    userArr.forEach(async (el) => {
      transactionArr.forEach(async (item) => {
        const foundMail = el === item ? item : null // this compares emails from the userDb and transactionDb
        if (foundMail) {
          transactions.forEach(async (items) => {
            const toUpdate = items.reference
            const found = items.reference === ref ? items : null
            if (found) {
              const currentTransaction = await transactionDb.findByRef({
                ref: toUpdate
              })
              let { transactionStatus, _id, initiator } = currentTransaction
              transactionStatus = 'In Progress'
              const [updated, email] = await Promise.all([
                transactionDb.update({ id: _id, transactionStatus }),
                sendInProgressEmail({ ref, initiator })
              ])
              return updated
            }
          })
        }
      })
    })
  }
}

export default makeInProgress

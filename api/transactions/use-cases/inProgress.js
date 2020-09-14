/* eslint-disable prefer-const */
const makeInProgress = ({ transactionDb, sendInProgressEmail, usersDb }) => {
  return async function inProgress({ user, ref }) {
    const { transactions } = user
    const foundUser = await usersDb.findAll()
    const foundTransaction = await transactionDb.findAll()

    // map through the returned documentss
    const userArr = foundUser
      .map((el) => el.email)
      .filter((person) => person !== null)

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
              const [updated] = await Promise.all([
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

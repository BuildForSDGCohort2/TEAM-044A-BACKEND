const dashboard = (transactionRef) =>
  `http://localhost:4000/api/v1/transactions/${transactionRef}`

const acceptanceEmailTemplate = (receiver, user, transaction, url) => {
  const from = 'kingetiosasere@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = user.firstName
  const subject = 'Your money has been placed in Escrow'
  const html = `
  <p>Hi ${username}, ${name} has placed your money in escrow, you can go ahead and send ${name} the goods as bargained.</p>
  <p>Click this link to go to your dashboard <a href=${url}>${url}</a></p>
  <p>Here is the summary of the transaction details.</p>

  <table>
    <tr>
      <th>Title</th>
      <th>Description</th>
      <th>Amount</th>
      <th>Status</th>
    </tr>
    <tr>
      <td>${transaction.transactionTitle}</td>
      <td>${transaction.transactionDesc}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.transactionStatus}</td>
    <tr>
  </table>

  <p>Thank you</p>
  <p>FastCash</p>
`
  return { from, to, username, name, subject, html }
}

export { dashboard, acceptanceEmailTemplate }

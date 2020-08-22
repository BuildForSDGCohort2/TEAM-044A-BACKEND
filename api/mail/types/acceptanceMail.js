const dashboardURL = (transactionRef) =>
  `http://localhost:4000/api/v1/transactions/${transactionRef}`

const transactionEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'kingetiosasere@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'Your Transaction Has Been Accepted'
  const html = `
    <p>Hi ${username}, ${name} has accepted your transaction, you can go ahead and make payment on your dashboard.</p>
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

export { dashboardURL, transactionEmailTemplate }

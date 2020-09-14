const rejectionEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'etiosaserekings@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'Your Transaction Has been Rejected'
  const html = `
    <p>Hi ${username}, ${name} has rejected your transaction, Please login to your dashboard to see reasons why, as well
    as contact ${username} to settle the issue..</p>
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
        <td>${transaction.amount / 100}</td>
        <td>${transaction.transactionStatus}</td>
      <tr>
    </table>

    <p>Thank you</p>
    <p>MoneyGuard</p>
  `
  return { from, to, username, name, subject, html }
}

export default rejectionEmailTemplate

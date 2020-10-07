const inProgressEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'imoneyguard@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'Your Product/Service is being Delivered'
  const html = `
    <p>Hi ${username}, your product is on its way to you. You will get it on or before the due date assigned</p>
    <p>You can visit your dashboard to see the status of your product.</p>
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
    <p>FastCash</p>
  `
  return { from, to, username, name, subject, html }
}

export default inProgressEmailTemplate

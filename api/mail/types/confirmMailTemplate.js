const confirmEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'kingetiosasere@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'Product Status Confirmed'
  const html = `
    <p>Hi ${username}, ${name} has confirmed the delivery of the product, Your funds will be settled to your account shortly.</p>
    <p>If you haven't verified your bank details yet, please do so, so as to enable your funds to be settled to your account.</p>
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

export default confirmEmailTemplate

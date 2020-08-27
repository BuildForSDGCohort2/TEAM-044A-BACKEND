const deliveryEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'kingetiosasere@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'Your Order has Been Delivered'
  const html = `
    <p>Hi ${username}, ${name} has delivered your product, please goto your dashboard and confirm the delivery.</p>
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

export { deliveryEmailTemplate }

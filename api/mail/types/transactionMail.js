import dotenv from 'dotenv'
import { urlGenerator } from '../../helpers/config'

dotenv.config()

// process.env.NODE_ENV = 'production'
const getTransactionEmailURL = () =>
  process.env.NODE_ENV === 'production'
    ? urlGenerator('signup')
    : `http://localhost:3000/signup`

const createTransactionTemplate = (receiver, sender, transaction, url) => {
  const from = 'etiosaserekings@gmail.com'
  const to = receiver.email
  const username = receiver.firstName
  const name = sender.firstName
  const subject = 'You have a new transaction pending'
  const html = `
    <p>Hi ${username}, you have a new transaction from ${from} with name ${name} awaiting your confirmation.</p>
    <p>Click this link to accept the transaction <a href=${url}>${url}</a></p>
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

    <p>Please click this link to access your dashboard to accept this transaction.</p>

    <p>Thank you</p> 
    <p>MoneyGuard</p>
  `
  return { from, to, username, name, subject, html }
}

export { getTransactionEmailURL, createTransactionTemplate }

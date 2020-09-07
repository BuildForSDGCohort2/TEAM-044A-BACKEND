"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const deliveryRejectionTemplate = (receiver, sender, transaction, url) => {
  const from = 'kingetiosasere@gmail.com';
  const to = receiver.email;
  const username = receiver.firstName;
  const name = sender.firstName;
  const subject = 'Your Delivered Transaction Has Been Rejected';
  const html = `
    <p>Hi ${username}, ${name} has rejected the delivered product/service, Please login to your dashboard to see reasons why, as well
    <p>as contact ${username} to settle the issue.</p>
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
  `;
  return {
    from,
    to,
    username,
    name,
    subject,
    html
  };
};

var _default = deliveryRejectionTemplate;
exports.default = _default;
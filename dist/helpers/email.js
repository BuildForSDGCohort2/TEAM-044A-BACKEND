"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transactionEmailTemplate = exports.getTransactionEmailURL = void 0;

const getTransactionEmailURL = transactionRef => `http://localhost:4000/api/v1/email/verify/${transactionRef}`;

exports.getTransactionEmailURL = getTransactionEmailURL;

const transactionEmailTemplate = (receiver, sender, transaction, url) => {
  const from = 'kingetiosasere@gmail.com';
  const to = receiver.email;
  const username = receiver.firstName;
  const name = sender.firstName;
  const subject = 'You have a new transaction pending';
  const html = `
    <p>Hi ${username}, you have a new transaction from ${from} with name ${name} awaiting your confirmation.</p>
    <p>Click this link to redirect to accept the transaction <a href=${url}>${url}</a></p>
    <p>Here is the summary of the transaction details.</p>

      Title                         | Description                    | Amount                | Status
                                    |                                |                       |
    ${transaction.transactionTitle} | ${transaction.transactionDesc} | ${transaction.amount} | Awaiting confirmation

    <p>Please click this link to access your dashboard to accept this transaction.</p>

    <p>Thank you. :)</p> 
    <p>FastCash</p>
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

exports.transactionEmailTemplate = transactionEmailTemplate;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeInProgressEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  inProgressEmailTemplate
}) => {
  return async function sendInProgressMail({
    ref,
    user,
    initiator
  }) {
    /**
     * The initiator of the transaction is meant to get the email stating the recipient is delivering the product or service.
     * The initiator in this case is the incoming user object.
     */
    const receiver = await usersDb.findById({
      id: initiator
    });
    const transactionDetails = await transactionDb.findByRef({
      ref
    });
    const {
      email
    } = transactionDetails;
    const transactionRef = transactionDetails.reference;
    const sender = await usersDb.findByEmail({
      email
    });
    const {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    } = transactionDetails;
    const transaction = {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    };
    const url = dashboardURL(transactionRef);
    const emailTemplate = inProgressEmailTemplate(receiver, sender, transaction, url);
    return await sendMail({
      emailTemplate
    });
  };
};

var _default = makeInProgressEmail;
exports.default = _default;
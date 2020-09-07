"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeConfirmEmail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  confirmEmailTemplate
}) => {
  return async function sendConfirmEmail({
    ref,
    initiator
  }) {
    const sender = await usersDb.findById({
      id: initiator
    });
    const receiver = await transactionDb.findByRef({
      ref
    });
    const transactionRef = receiver.reference;
    const {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    } = receiver;
    const transaction = {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    };
    const url = dashboardURL(transactionRef);
    const emailTemplate = confirmEmailTemplate(receiver, sender, transaction, url);
    return await sendMail({
      emailTemplate
    });
  };
};

var _default = makeConfirmEmail;
exports.default = _default;
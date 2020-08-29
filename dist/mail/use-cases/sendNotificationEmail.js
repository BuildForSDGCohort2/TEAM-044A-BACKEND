"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeSendNotificationEmail = ({
  transactionDb,
  sendMail,
  dashboardURL,
  acceptanceEmailTemplate
}) => {
  return async function sendNotificationEmail({
    ref,
    user
  }) {
    const receiver = await transactionDb.findByRef({
      ref
    });
    const transactionRef = receiver.reference;
    const {
      transactionStatus,
      transactionTitle,
      transactionDesc,
      amount
    } = receiver;
    const transaction = {
      transactionTitle,
      transactionDesc,
      amount,
      transactionStatus
    };
    const url = dashboardURL(transactionRef);
    const emailTemplate = acceptanceEmailTemplate(receiver, user, transaction, url);
    return await sendMail({
      emailTemplate
    });
  };
};

var _default = makeSendNotificationEmail;
exports.default = _default;
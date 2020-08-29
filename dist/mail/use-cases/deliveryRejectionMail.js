"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-return-await */
const makeDeliveryRejectionMail = ({
  transactionDb,
  usersDb,
  sendMail,
  dashboardURL,
  deliveryRejectionTemplate
}) => {
  return async function sendDeliveryRejectionEmail({
    ref,
    user
  }) {
    console.log('USER', user);
    const sender = await usersDb.findById({
      id: user.id
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
    const emailTemplate = deliveryRejectionTemplate(receiver, sender, transaction, url);
    return await sendMail({
      emailTemplate
    });
  };
};

var _default = makeDeliveryRejectionMail;
exports.default = _default;
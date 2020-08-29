"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = makeSendMoneyToReceiver;

function makeSendMoneyToReceiver({
  escrowDb,
  releaseFunds
}) {
  return async function sendToReceiver({
    insepctionPeriod,
    dueDate,
    sellerId
  } = {}) {
    const [checkInspectionPeriod, dateMarked] = await Promise.all([await escrowDb.retrieveInspectionPeriod({
      date: insepctionPeriod
    }), await escrowDb.retrieveDueDate({
      date: dueDate
    })]); // Inspection period should be saved in milliseconds to ensure consistency

    if (checkInspectionPeriod === dateMarked) {
      releaseFunds(sellerId);
    } // if (checkInspectionPeriod !== dateMarked) {
    //   holdMoney()
    // }

  };
}
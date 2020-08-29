"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildMakeDisputeFactory;

function buildMakeDisputeFactory() {
  return function makeDispute({
    transactionId,
    decision,
    disputeStatus,
    createdAt = Date.now(),
    updatedAt = Date.now()
  } = {}) {
    return Object.freeze({
      getId: () => transactionId,
      getDecision: () => decision,
      getStatus: () => disputeStatus,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    });
  };
}
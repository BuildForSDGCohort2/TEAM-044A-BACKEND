"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeAddDispute = ({
  transactionDb,
  disputeDb,
  sendDisputeMail
}) => {
  return async function addDispute({
    userId,
    transactionId,
    ...disputeInfo
  } = {}) {
    const transaction = (0, _factory.default)({
      transactionId,
      ...disputeInfo
    });
    const currentTransaction = await transactionDb.findById({
      id: transaction.getId()
    });

    if (!currentTransaction) {
      throw new Error('Transaction does not exist.');
    }

    const dispute = await disputeDb.insert({
      transactionId: transaction.getId(),
      decision: transaction.getDecision(),
      disputeStatus: transaction.getStatus(),
      createdAt: transaction.getCreatedAt(),
      updatedAt: transaction.getUpdatedAt(),
      initiatorId: userId,
      userId
    });
    await sendDisputeMail({
      transactionId
    });
    return dispute;
  };
};

var _default = makeAddDispute;
exports.default = _default;
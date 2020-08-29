"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeEditDispute = ({
  disputeDb
}) => {
  return async function editDispute({
    id,
    ...changes
  } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.');
    }

    const currentTransaction = await disputeDb.findById({
      id
    });

    if (!currentTransaction) {
      throw new RangeError('Dispute does not exist.');
    }

    const transaction = (0, _factory.default)({ ...changes
    });
    return disputeDb.update({
      decision: transaction.getDecision(),
      disputeStatus: transaction.getStatus(),
      updatedAt: transaction.getUpdatedAt(),
      id
    });
  };
};

var _default = makeEditDispute;
exports.default = _default;
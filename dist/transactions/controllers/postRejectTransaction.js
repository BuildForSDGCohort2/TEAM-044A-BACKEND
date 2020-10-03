"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostRejectTransaction = ({
  rejectTransactionRequest
}) => {
  const postAcceptTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      ref
    } = httpRequest.pathParams;
    const transaction = await rejectTransactionRequest({
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 200,
      message: 'Transaction Rejected',
      data: transaction
    });
  });
  return postAcceptTransaction;
};

var _default = makePostRejectTransaction;
exports.default = _default;
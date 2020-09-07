"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostRejectDeliveredTransaction = ({
  rejectDeliveredTransaction
}) => {
  const postRejectDelivery = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      ref
    } = httpRequest.pathParams;
    await rejectDeliveredTransaction({
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 200,
      message: 'Transaction Delivery Rejected',
      data: null
    });
  });
  return postRejectDelivery;
};

var _default = makePostRejectDeliveredTransaction;
exports.default = _default;
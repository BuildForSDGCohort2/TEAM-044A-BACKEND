"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostConfirmTransaction = ({
  confirmTransaction
}) => {
  const postConfirmTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const {
      ref
    } = httpRequest.pathParams;
    await confirmTransaction({
      user,
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      message: 'Transaction Delivery Confirmed',
      data: null,
      statusCode: 200
    });
  });
  return postConfirmTransaction;
};

var _default = makePostConfirmTransaction;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostVerifyTransaction = ({
  verifyTransaction
}) => {
  const postVerifyTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const { ...details
    } = httpRequest.body;
    await verifyTransaction({
      user,
      ...details
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      message: 'Payment Successful',
      data: null,
      statusCode: 200
    });
  });
  return postVerifyTransaction;
};

var _default = makePostVerifyTransaction;
exports.default = _default;
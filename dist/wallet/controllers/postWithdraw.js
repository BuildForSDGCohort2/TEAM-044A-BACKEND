"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostWithdraw = ({
  walletWithdraw
}) => {
  const postWithdraw = (0, _tryCatchHandler.default)(async httpRequest => {
    const { ...walletDetails
    } = httpRequest.body;
    const {
      user
    } = httpRequest;
    await walletWithdraw({
      user,
      ...walletDetails
    });
    return (0, _httpResponse.apiResponse)({
      status: 'OK',
      statusCode: 200,
      message: 'Withdrawal Successful',
      data: null
    });
  });
  return postWithdraw;
};

var _default = makePostWithdraw;
exports.default = _default;
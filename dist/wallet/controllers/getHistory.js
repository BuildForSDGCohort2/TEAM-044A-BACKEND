"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

var _httpResponse = require("../../helpers/http-response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeGetWalletHistory = ({
  walletHistory
}) => {
  return (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      id
    } = httpRequest.user;
    const wallet = await walletHistory({
      id
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: wallet
    });
  });
};

var _default = makeGetWalletHistory;
exports.default = _default;
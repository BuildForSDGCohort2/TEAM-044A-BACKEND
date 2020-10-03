"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostTransfer = ({
  walletTransfer
}) => {
  return (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      id
    } = httpRequest.user;
    const { ...walletDetails
    } = httpRequest.body;
    await walletTransfer({
      id,
      ...walletDetails
    });
    return (0, _httpResponse.apiResponse)({
      status: 'OK',
      statusCode: 200,
      message: 'Transfer successful',
      data: null
    });
  });
};

var _default = makePostTransfer;
exports.default = _default;
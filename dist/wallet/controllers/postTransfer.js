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
  const postTransfer = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const { ...walletDetails
    } = httpRequest.body;
    await walletTransfer({
      user,
      ...walletDetails
    });
    return (0, _httpResponse.apiResponse)({
      status: 'OK',
      statusCode: 200,
      message: 'Transfer successful',
      data: null
    });
  });
  return postTransfer;
};

var _default = makePostTransfer;
exports.default = _default;
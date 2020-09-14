"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostDeposit = ({
  walletDeposit
}) => {
  const postDeposit = (0, _tryCatchHandler.default)(async httpRequest => {
    const { ...walletDetails
    } = httpRequest.body;
    const {
      user
    } = httpRequest;
    const userId = user.id;
    const deposit = await walletDeposit({ ...walletDetails,
      userId
    });
    return (0, _httpResponse.apiResponse)({
      status: 'OK',
      statusCode: 200,
      message: 'Deposit successful',
      data: [{
        deposit
      }]
    });
  });
  return postDeposit;
};

var _default = makePostDeposit;
exports.default = _default;
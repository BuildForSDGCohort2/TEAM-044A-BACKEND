"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

var _httpResponse = require("../../helpers/http-response");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makePostCreateWallet = ({
  createWallet
}) => {
  const postWallet = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      user
    } = httpRequest;
    const wallet = await createWallet({
      user
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 201,
      message: 'Wallet created',
      data: [{
        wallet
      }]
    });
  });
  return postWallet;
};

var _default = makePostCreateWallet;
exports.default = _default;
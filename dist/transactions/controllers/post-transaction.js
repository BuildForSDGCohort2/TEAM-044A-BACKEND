"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-underscore-dangle */
const makePostTransaction = ({
  createTransaction
}) => {
  const postTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      source = {},
      ...transactionInfo
    } = httpRequest.body;
    const {
      user
    } = httpRequest;
    source.ip = httpRequest.ip;
    source.browser = httpRequest.headers['User-Agent'];

    if (httpRequest.headers.Referer) {
      source.referrer = httpRequest.headers.Referer;
    }

    const transaction = await createTransaction({
      user,
      source,
      ...transactionInfo
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      message: 'Transaction Created',
      data: [{
        transaction
      }],
      statusCode: 201
    });
  });
  return postTransaction;
};

var _default = makePostTransaction;
exports.default = _default;
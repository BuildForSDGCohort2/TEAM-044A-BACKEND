"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Accept Transaction Controller - Responsible for sending a POST request
 * Required - Transaction Reference Id
 * @function makePostAcceptTransaction
 * @returns {object}
 */
const makePostAcceptTransaction = ({
  acceptTransaction
}) => {
  const postAcceptTransaction = (0, _tryCatchHandler.default)(async httpRequest => {
    const {
      ref
    } = httpRequest.pathParams;
    await acceptTransaction({
      ref
    });
    return (0, _httpResponse.apiResponse)({
      status: true,
      statusCode: 200,
      message: 'Transaction Accepted',
      data: null
    });
  });
  return postAcceptTransaction;
};

var _default = makePostAcceptTransaction;
exports.default = _default;
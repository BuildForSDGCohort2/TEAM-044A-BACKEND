"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostRejectTransaction = ({
  rejectTransactionRequest
}) => {
  return async function postAcceptTransaction(httpRequest) {
    try {
      const {
        ref
      } = httpRequest.pathParams;
      await rejectTransactionRequest({
        ref
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        statusCode: 200,
        message: 'Transaction Rejected',
        data: null
      });
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        statusCode: error.statusCode || 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
  };
};

var _default = makePostRejectTransaction;
exports.default = _default;
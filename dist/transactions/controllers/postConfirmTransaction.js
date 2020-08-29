"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostConfirmTransaction = ({
  confirmTransaction
}) => {
  return async function postConfirmTransaction(httpRequest) {
    try {
      const {
        user
      } = httpRequest;
      const {
        ref
      } = httpRequest.pathParams;
      await confirmTransaction({
        user,
        ref
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Transaction Delivery Confirmed',
        data: null,
        statusCode: 200
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

var _default = makePostConfirmTransaction;
exports.default = _default;
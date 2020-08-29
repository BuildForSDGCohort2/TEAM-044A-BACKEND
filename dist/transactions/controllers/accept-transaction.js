"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

/**
 * Accept Transaction Controller - Responsible for sending a POST request
 * Required - Transaction Reference Id
 * @function makePostAcceptTransaction
 * @returns {object}
 */
const makePostAcceptTransaction = ({
  acceptTransaction
}) => {
  return async function postAcceptTransaction(httpRequest) {
    try {
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

var _default = makePostAcceptTransaction;
exports.default = _default;
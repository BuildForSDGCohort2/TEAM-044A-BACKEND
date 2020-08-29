"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

/* eslint-disable no-underscore-dangle */
const makePostTransaction = ({
  createTransaction
}) => {
  return async function postTransaction(httpRequest) {
    try {
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
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        title: error.name,
        errorMessage: error.message,
        statusCode: error.statusCode || 400,
        stack: error.stack
      });
    }
  };
};

var _default = makePostTransaction;
exports.default = _default;
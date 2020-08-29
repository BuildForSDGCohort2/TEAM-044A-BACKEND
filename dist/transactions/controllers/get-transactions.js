"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makeGetTransactions = ({
  listTransactions
}) => {
  return async function getTransactions(httpRequest) {
    try {
      const {
        ref
      } = httpRequest.pathParams;
      const {
        sent,
        recieved,
        all
      } = httpRequest.query;
      let transactions;

      switch (httpRequest.query) {
        case sent:
          transactions = await listTransactions({
            sent
          });
          break;

        case recieved:
          transactions = await listTransactions({
            recieved
          });
          break;

        case all:
          transactions = await listTransactions({
            all
          });
          break;

        default:
          transactions = await listTransactions();
      }

      transactions = ref ? await listTransactions({
        ref: httpRequest.pathParams.ref
      }) : await listTransactions();
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Transactions',
        data: [{
          transactions
        }],
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

var _default = makeGetTransactions;
exports.default = _default;
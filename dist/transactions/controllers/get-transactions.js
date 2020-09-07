"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

var _tryCatchHandler = _interopRequireDefault(require("../../helpers/try-catch-handler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeGetTransactions = ({
  listTransactions
}) => {
  const getTransactions = (0, _tryCatchHandler.default)(async httpRequest => {
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
  });
  return getTransactions;
};

var _default = makeGetTransactions;
exports.default = _default;
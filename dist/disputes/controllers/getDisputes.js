"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makeGetDisputes = ({
  listDisputes
}) => {
  return async function postDispute(httpRequest) {
    try {
      const {
        id
      } = httpRequest.user;
      const disputes = await listDisputes({
        id
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Transaction Disputes',
        data: [disputes],
        statusCode: 200
      });
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        statusCode: 400,
        title: error.name,
        errorMessage: error.message,
        stack: error.stack
      });
    }
  };
};

var _default = makeGetDisputes;
exports.default = _default;
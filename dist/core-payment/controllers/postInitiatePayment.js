"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostPayment = ({
  sendMoney
}) => {
  return async function postPayment(httpRequest) {
    try {
      const {
        user
      } = httpRequest;
      const {
        ref
      } = httpRequest.pathParams;
      const toAdd = await sendMoney({
        ref,
        user
      });
      return (0, _httpResponse.onSuccess)({
        type: 'payments',
        attributes: toAdd,
        statusCode: 200
      });
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        statusCode: 400,
        errorMessage: error.message,
        title: error.name,
        stack: error.stack
      });
    }
  };
};

var _default = makePostPayment;
exports.default = _default;
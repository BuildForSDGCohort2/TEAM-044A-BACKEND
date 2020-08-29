"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostDeliveryTransaction = ({
  deliveryComplete
}) => {
  return async function postDeliverTransaction(httpRequest) {
    try {
      const {
        user
      } = httpRequest;
      console.log('USER', user);
      const {
        ref
      } = httpRequest.pathParams;
      await deliveryComplete({
        user,
        ref
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Transaction Delivered',
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

var _default = makePostDeliveryTransaction;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostInProgress = ({
  inProgress
}) => {
  return async function postInProgress(httpRequest) {
    try {
      const {
        user
      } = httpRequest;
      const {
        ref
      } = httpRequest.pathParams;
      await inProgress({
        user,
        ref
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Transaction in Progress',
        statusCode: 200,
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

var _default = makePostInProgress;
exports.default = _default;
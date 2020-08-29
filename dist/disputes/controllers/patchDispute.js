"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePatchDispute = ({
  editDispute
}) => {
  return async function patchDispute(httpRequest) {
    try {
      const { ...changes
      } = httpRequest.body;
      const {
        id
      } = httpRequest.pathParams;
      await editDispute({
        id,
        ...changes
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Dispute Updated',
        data: null,
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

var _default = makePatchDispute;
exports.default = _default;
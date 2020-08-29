"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostDispute = ({
  addDispute
}) => {
  return async function postDispute(httpRequest) {
    try {
      const { ...disputeInfo
      } = httpRequest.body;
      const dispute = await addDispute({ ...disputeInfo
      });
      return (0, _httpResponse.apiResponse)({
        status: true,
        message: 'Dispute Created',
        data: dispute,
        statusCode: 201
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

var _default = makePostDispute;
exports.default = _default;
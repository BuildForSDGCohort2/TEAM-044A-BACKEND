"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makeGetEmail = ({
  verifyEmail
}) => {
  return async function getEmail(httpRequest) {
    try {
      const { ...details
      } = httpRequest.pathParams;
      const redirect = '/api/v1/email/verify';
      const user = await verifyEmail({ ...details
      });
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        data: user,
        statusCode: 200,
        redirect
      };
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

var _default = makeGetEmail;
exports.default = _default;
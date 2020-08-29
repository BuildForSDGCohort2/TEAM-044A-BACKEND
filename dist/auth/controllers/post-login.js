"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

const makePostLogin = ({
  loginUser
}) => {
  return async function postLogin(httpRequest) {
    try {
      let { ...userInfo
      } = httpRequest.body;

      if (typeof httpRequest.body === 'string') {
        try {
          userInfo = JSON.parse(userInfo);
        } catch (error) {
          return (0, _httpResponse.makeHttpError)({
            statusCode: 403,
            errorMessage: 'Bad request. POST body must be valid JSON'
          });
        }
      }

      const user = await loginUser({ ...userInfo
      });
      return {
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        statusCode: 200,
        data: user
      };
    } catch (error) {
      return (0, _httpResponse.makeHttpError)({
        title: error.name,
        errorMessage: error.message,
        statusCode: error.statusCode || 401,
        stack: error.stack
      });
    }
  };
};

var _default = makePostLogin;
exports.default = _default;
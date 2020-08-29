"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _httpResponse = require("../../helpers/http-response");

/* eslint-disable no-underscore-dangle */
const makePatchUser = ({
  editUser
}) => {
  return async function patchUser(httpRequest) {
    try {
      // eslint-disable-next-line prefer-const
      let { ...userInfo
      } = httpRequest.body;

      if (typeof httpRequest.body === 'string') {
        try {
          userInfo = JSON.parse(userInfo);
        } catch {
          return (0, _httpResponse.makeHttpError)({
            statusCode: 403,
            errorMessage: 'Bad request. POST body must be valid JSON'
          });
        }
      }

      const toEdit = { ...userInfo,
        id: httpRequest.pathParams.id
      };
      const user = await editUser(toEdit);
      return (0, _httpResponse.onSuccess)({
        type: 'users',
        // id: httpRequest.pathParams
        attributes: user,
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

var _default = makePatchUser;
exports.default = _default;
"use strict";

var _snakeCase = _interopRequireDefault(require("lodash/snakeCase"));

var _express = _interopRequireDefault(require("express"));

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-dynamic-require */

/* eslint-disable global-require */

/* eslint-disable no-useless-return */
module.exports = app => {
  (0, _fs.readdirSync)(__dirname).forEach(file => {
    if (file === 'index.js') return;

    const router = _express.default.Router();

    const routeModule = require(require('path').join(__dirname, file));

    const path = routeModule.path || `/${file !== 'root.js' ? (0, _snakeCase.default)(file.replace('.js', '')) : ''}`;
    const route = routeModule.config ? routeModule.config(router) : routeModule(router);
    app.use(path, route);
  });
};
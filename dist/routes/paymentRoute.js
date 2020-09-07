"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = config;
exports.path = void 0;

var _fundTransaction = require("../transactions/use-cases/fundTransaction");

const path = '/api/v1/payment';
exports.path = path;

function config(router) {
  router.get('/paystack/callback', _fundTransaction.verifyTransaction).post('/paystack/pay/:ref', _fundTransaction.createTransaction);
  return router;
}
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/* eslint-disable no-console */
process.env.NODE_ENV = 'dev';
const url = process.env.DB_URL || 'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs';

const setupDB = async () => {
  try {
    await _mongoose.default.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      replicaSet: 'rs'
    });
    console.log(`Connected to ${url}`);
  } catch (e) {
    return console.log(e);
  }
};

var _default = setupDB;
exports.default = _default;
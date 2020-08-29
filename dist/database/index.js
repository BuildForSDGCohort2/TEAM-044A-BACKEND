"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable consistent-return */

/* eslint-disable no-console */
const setupDB = async (uri, dbUrl) => {
  try {
    await _mongoose.default.connect(`${uri}/${dbUrl}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      replicaSet: 'rs'
    });
    console.log('Connected');
  } catch (e) {
    return console.log(e);
  }
}; // mongoose
//   .connect(
//     `mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/escrow?replicaSet=rs`,
//     {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//       replicaSet: 'rs'
//     }
//   )
//   .then(() => {
//     console.log('Connected')
//   })
//   .catch((e) => console.log(e))


var _default = setupDB;
exports.default = _default;
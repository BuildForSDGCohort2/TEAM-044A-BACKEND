"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.decodeToken = exports.sendTokenResponse = exports.createToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const createToken = userId => {
  return _jsonwebtoken.default.sign(userId, process && process.env && process.env.JWT_SECRET || "kingisagoodboy", {
    expiresIn: '1d'
  });
};

exports.createToken = createToken;

const sendTokenResponse = userId => {
  const token = createToken(userId);
  return JSON.stringify({
    token
  });
};

exports.sendTokenResponse = sendTokenResponse;

const decodeToken = details => {
  return _jsonwebtoken.default.decode(details);
};

exports.decodeToken = decodeToken;

const verifyToken = token => {
  return _jsonwebtoken.default.verify(token, process && process.env && process.env.JWT_SECRET || "kingisagoodboy");
}; // const verifyEmailToken = email => {
//   return jwt.sign(email, process.env.JWT_SECRET, {expiresIn:'1d'})
// }


exports.verifyToken = verifyToken;
"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _database = _interopRequireDefault(require("../database"));

var _subscriber = _interopRequireDefault(require("../pubsub/subscriber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import usersDb from '../users/model'
const app = (0, _express.default)();
(0, _database.default)();
(0, _subscriber.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); // Initiator
// app.use(async (req, res, next) => {
//   const user = await usersDb.findById({ id: '5f4fd5b0d9f81a072c337b48' })
//   req.user = user
//   next()
// })
// Recipient
// app.use(async (req, res, next) => {
//   const user = await usersDb.findById({ id: '5f57e4feffa22d0e104e210a' })
//   req.user = user
//   next()
// })

app.get('/', (_, res) => res.json({
  msg: 'MoneyGuard is Protectinggg.'
}));
app.get('/:ref', (req, res) => {
  res.sendFile(_path.default.join(__dirname, './pay.html'));
});

require('../routes')(app);

module.exports = app;
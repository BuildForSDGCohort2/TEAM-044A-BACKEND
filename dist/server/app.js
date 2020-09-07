"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _path = _interopRequireDefault(require("path"));

var _database = _interopRequireDefault(require("../database"));

var _model = _interopRequireDefault(require("../users/model"));

var _subscriber = _interopRequireDefault(require("../pubsub/subscriber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // setupDB('mongodb://localhost:27017,localhost:27018,localhost:27019', 'escrow')
// setupDB(
//   'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019',
//   'escrow?replicaSet=rs'
// )

(0, _database.default)(`mongodb+srv://king:${process.env.DB_PASS}@projects.yhzkf.mongodb.net`, `${process.env.DB_URL}?retryWrites=true&w=majority`);
(0, _subscriber.default)();
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); // Initiator

app.use(async (req, res, next) => {
  const user = await _model.default.findById({
    id: '5f4fd5b0d9f81a072c337b48'
  });
  req.user = user;
  next();
}); // Recipient
// app.use(async (req, res, next) => {
//   const user = await usersDb.findById({ id: '5f460a421ff47031a02f4775' })
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
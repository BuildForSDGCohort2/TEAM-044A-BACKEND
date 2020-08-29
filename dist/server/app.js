"use strict";

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("../database"));

var _path = _interopRequireDefault(require("path"));

var _model = _interopRequireDefault(require("../users/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)(); // setupDB('mongodb://localhost:27017,localhost:27018,localhost:27019', 'escrow')
// setupDB(
//   'mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019',
//   'escrow?replicaSet=rs'
// )

(0, _database.default)(`mongodb+srv://king:${process && process.env && process.env.DB_PASS || "jesusisreal"}@projects.yhzkf.mongodb.net`, `${process && process.env && process.env.DB_URL || "escrow"}?retryWrites=true&w=majority`);
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
})); //Initiator

app.use(async (req, res, next) => {
  const user = await _model.default.findById({
    id: '5f4aa44f16d0172a30a92362'
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
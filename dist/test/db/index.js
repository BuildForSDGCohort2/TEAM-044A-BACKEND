"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-undef */

/* eslint-disable no-console */

/* eslint-disable no-await-in-loop */

/* eslint-disable no-restricted-syntax */
_mongoose.default.set('useCreateIndex', true);

_mongoose.default.promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(_mongoose.default.connection.collections);

  for (const collectionName of collections) {
    const collection = _mongoose.default.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function dropAllCollections() {
  const collections = Object.keys(_mongoose.default.connection.collections);

  for (const collectionName of collections) {
    const collection = _mongoose.default.connection.collections[collectionName];

    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === 'ns not found') return; // This error occurs when you use it.todo. You can
      // safely ignore this error too

      if (error.message.includes('a background operation is currently running')) return;
      console.log(error.message);
    }
  }
}

const setupDB = databaseName => {
  // Connect to Mongoose
  beforeAll(async () => {
    // const url = `mongodb://DESKTOP-SNA1HQK:27017,DESKTOP-SNA1HQK:27018,DESKTOP-SNA1HQK:27019/${databaseName}`
    const url = `mongodb://localhost:27017/${databaseName}`;
    await _mongoose.default.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }); // Cleans up database between each test

  afterEach(async () => {
    await removeAllCollections();
  }); // Disconnect Mongoose

  afterAll(async () => {
    await dropAllCollections();
    await _mongoose.default.connection.close();
  });
};

var _default = setupDB;
exports.default = _default;
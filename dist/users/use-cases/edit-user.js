"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _factory = _interopRequireDefault(require("../factory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeEditUser = ({
  usersDb
}) => {
  return async function editUser({
    id,
    ...changes
  } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.');
    }

    const exists = await usersDb.findById(id);

    if (!exists) {
      throw new RangeError('User does not exist.');
    }

    const user = (0, _factory.default)({ ...changes
    });
    return usersDb.update({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      email: user.getEmail(),
      phoneNumber: user.getPhoneNumber(),
      password: user.getPassword(),
      dob: user.getDOB(),
      username: user.getUsername(),
      modifiedOn: user.getModifiedOn(),
      id
    });
  };
};

var _default = makeEditUser;
exports.default = _default;
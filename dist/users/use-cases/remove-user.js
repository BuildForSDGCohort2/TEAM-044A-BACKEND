"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const makeRemoveUser = ({
  usersDb
}) => {
  return async function removeUser({
    id
  } = {}) {
    if (!id) {
      throw new Error('You must supply a valid id.');
    }

    const userToDelete = await usersDb.findById({
      id
    });

    async function hardDelete(user) {
      await usersDb.remove(user);
      return {
        deletedCount: 1,
        message: 'User deleted.'
      };
    }

    function deleteNothing() {
      return {
        deletedCount: 0,
        message: 'User not found, nothing to delete.'
      };
    }

    if (!userToDelete) {
      return deleteNothing();
    }

    return hardDelete(userToDelete);
  };
};

var _default = makeRemoveUser;
exports.default = _default;
const User = require('../repositories/userRepository');
const Message = require('../repositories/messageRepository')

function getAll () {
    return User.getAll();
};

function getUserByNickname (nickname) {
    return User.getByNickname(nickname);
};

function createNewUser (data) {
    return User.create(data);
};

function updateUserInfo (id, data) {
    return User.update(id, data);
};

function deleteUser (id) {
    return User.delete(id);
};

module.exports = {
    getAll,
    getUserByNickname,
    createNewUser,
    updateUserInfo,
    deleteUser
}
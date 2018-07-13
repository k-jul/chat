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

function getFriendsByUserId (id) {
  return Message.getMessagesByUserId(id)
    .then((messages) => {
        let friendsIds = [];
        messages.forEach(message => {
            if (message.receiverId == id) friendsIds.push(message.senderId);
            else friendsIds.push(message.receiverId);
        });

        friendsIds = friendsIds.filter((elem, index, arr) => arr.indexOf(elem) === index); // filter only unique Ids (removing duplicates)
        
        return User.getByIds(friendsIds);

    })
}

module.exports = {
    getAll,
    getUserByNickname,
    createNewUser,
    updateUserInfo,
    deleteUser,
    getFriendsByUserId
}
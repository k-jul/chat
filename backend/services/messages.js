const Message = require('../repositories/messageRepository');


function getAll () {
    return Message.getAll();
};

function getMessageById (id) {
    return Message.getById(id);
};

function createMessage (data) {
    return Message.create(data);
};

function updateMessage (id, data) {
    return Message.update(id, data);
};

function deleteMessage (id) {
    return Message.delete(id);
};

module.exports = {
    getAll,
    getMessageById,
    createMessage,
    updateMessage,
    deleteMessage
}
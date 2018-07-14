const Message = require('../repositories/messageRepository');


function getAll () {
    return Message.getAll();
};

function getNewMessages(lastMsgDate){
    return Message.getNew(lastMsgDate);
}

function createMessage (data) {
    return Message.create(data);
};

module.exports = {
    getAll,
    createMessage,
    getNewMessages
}
const Message = require('../repositories/messageRepository');
const R = require('ramda');
const {initBot} =require('../bot');

const isBot = R.compose(R.test(/^@bot/),R.prop('body'));

class NewMessageFacade {
    static create(data) {
        return R.ifElse(
            isBot,
            initBot,
            R.composeP(R.of, Message.create)
        )(data)
    }
}


function getAll () {
    return Message.getAll();
};

function getNewMessages(lastMsgDate){
    return Message.getNew(lastMsgDate);
}

function newMessage (data) {
    return NewMessageFacade.create(data)
};

module.exports = {
    getAll,
    newMessage,
    getNewMessages
}
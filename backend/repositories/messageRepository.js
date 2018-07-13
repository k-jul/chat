const Repository = require('./generalRepository');
const Message = require('../db/schemas/messages');

class MessageRepository extends Repository {
    constructor() {
        super();
        this.model = Message;
    }

    getMessagesByUserId(id) {
        return this.model.find({
            '$or': [
                {
                    "senderId": id
                },
                {
                    "receiverId": id
                }
            ]
        });
    }
}

module.exports = new MessageRepository();
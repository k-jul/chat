const Repository = require('./generalRepository');
const Message = require('../db/schemas/messages');

class MessageRepository extends Repository {
    constructor() {
        super();
        this.model = Message;
    }
   getAll() {
    return this.model.find()
    .sort({'sendingTime': 1})
    .limit(100)
    .populate('sender')
   }

   getNew(lastMsgDate) {
       return this.model.find({'sendingTime': {$gt: lastMsgDate}})
       .sort({'sendingTime': 1})
       .populate('sender')
   }

}

module.exports = new MessageRepository();
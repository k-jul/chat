const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema ({

    senderId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    body: {
        type: String
    }
})

module.exports = mongoose.model('messages', messageSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema ({

    senderId: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    receiverId: {
        type: ObjectId,
        ref: 'users',
        required: true
    },
    sendingTime: {
        type: Date,
        default: Date.now,

    },

    body: {
        type: String
    }
},
 {versionKey:false});

module.exports = mongoose.model('messages', messageSchema);
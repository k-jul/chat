const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
},
{versionKey:false})

module.exports = mongoose.model('users', userSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema ({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    }
},
 {versionKey:false});

module.exports = mongoose.model('notes', noteSchema);
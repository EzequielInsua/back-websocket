const mongoose = require('mongoose');
const {Schema} =  mongoose;

const ChatSchema = new Schema({
        author: { 
            id:  String,
            name: String,
            lastname: String,
            age: String,
            alias: String,
            avatar: String,
        },
        text: String,
        created_at: {
            type: Date,
            default: Date.now()
        }
    }
);
module.exports = mongoose.model('Chat', ChatSchema);
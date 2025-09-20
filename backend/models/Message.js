const mongoose = require('mongoose');
const { recompileSchema } = require('./User');

const messageSchema = new mongoose.Schema({
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reciever: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    imageOrVideoUrl: { type: String },
    contentType: { type: String, enum: ['text', 'image', 'video'] },
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            emoji: { type: String }
        }
    ],
    messageStatus:{type:String,default:'Send'}
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
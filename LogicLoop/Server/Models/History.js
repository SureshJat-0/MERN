const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const History = mongoose.model('History', historySchema);
module.exports = History;
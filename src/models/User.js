const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    date: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);
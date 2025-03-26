const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Passport local mongoose will automatically add username and password
const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: true
    }
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

module.exports = User;

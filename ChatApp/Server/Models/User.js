const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// PassportLocalMongoose will automaticaly add username and password
const UserSchema = new mongoose.Schema({});

UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", UserSchema);

module.exports = User;

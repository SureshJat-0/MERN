const express = require("express");
const UserRouter = express.Router();

const { handleSignup, handleLogin } = require("../Controller/User.js");

UserRouter.route("/signup").post(handleSignup);
UserRouter.route("/login").post(handleLogin);

module.exports = UserRouter;

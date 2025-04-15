const express = require("express");
const UserRouter = express.Router();

const { handleSignup, handleLogin, handleAuthStatus, handleLogout } = require("../Controller/User.js");

UserRouter.route("/signup").post(handleSignup);
UserRouter.route("/login").post(handleLogin);
UserRouter.route("/status").get(handleAuthStatus);
UserRouter.route('/logout').get(handleLogout);

module.exports = UserRouter;

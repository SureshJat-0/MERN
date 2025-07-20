const express = require("express");
const AuthRouter = express.Router();

const { handleSignup, handleLogin, handleLogout, getAuthStatus } = require("../Controllers/Auth");
const { asyncWrap } = require("../Error");

AuthRouter.route("/signup").post(asyncWrap(handleSignup));
AuthRouter.route("/login").post(asyncWrap(handleLogin));
AuthRouter.route("/logout").get(asyncWrap(handleLogout));
AuthRouter.route("/status").get(asyncWrap(getAuthStatus));

module.exports = AuthRouter;

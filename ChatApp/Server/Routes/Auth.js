const express = require("express");
const AuthRouter = express.Router();

const { handleSignup, handleLogin } = require("../Controllers/Auth");
const { asyncWrap } = require("../Error");

AuthRouter.route("/signup").post(asyncWrap(handleSignup));
AuthRouter.route("/login").post(asyncWrap(handleLogin));

module.exports = AuthRouter;

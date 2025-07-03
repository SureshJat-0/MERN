const express = require("express");
const UserRouter = express.Router();

const asyncWrap = require("../asyncErrHan");

const { handleUserSignup, handleUserLogin } = require("../Controllers/User");

UserRouter.route("/signup").post(asyncWrap(handleUserSignup));
UserRouter.route('/login').post(handleUserLogin);

module.exports = UserRouter;

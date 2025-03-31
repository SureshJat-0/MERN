const express = require("express");
const UserRouter = express.Router();
const { asyncWrap } = require("../Errors/asyncWrap.js");

const {
  handleSignupPost,
  handleLoginPost,
  handleLogout,
} = require("../Controller/UserHandler.js");
const isLoggedIn = require("../Middlewares/auth.js");

UserRouter.route("/signup").post(asyncWrap(handleSignupPost));
UserRouter.route("/login").post(handleLoginPost);
UserRouter.route("/logout").get(handleLogout);

// Check for auth
UserRouter.route("/status").get(asyncWrap(isLoggedIn));

module.exports = UserRouter;

const express = require("express");
const UserRouter = express.Router();

const {
  handleSignupPost,
  handleLoginPost,
  handleLogout,
} = require("../Controller/UserHandler.js");
const isLoggedIn = require("../Middlewares/auth.js");

UserRouter.route("/signup").post(handleSignupPost);
UserRouter.route("/login").post(handleLoginPost);
UserRouter.route("/logout").get(handleLogout);

// Check for auth
UserRouter.route("/status").get(isLoggedIn);

module.exports = UserRouter;

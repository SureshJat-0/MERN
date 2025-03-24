const express = require("express");
const UserRouter = express.Router();

const passport = require("passport");

const {
  HandleSignupPost,
  HandleLoginPost,
} = require("../Controller/UserHandler.js");
const isLoggedIn = require("../Middlewares/auth.js");

UserRouter.route("/signup").post(HandleSignupPost);
UserRouter.route("/login").post(
  passport.authenticate("local"),
  HandleLoginPost
);

// Check for auth
UserRouter.route("/status").get(isLoggedIn);

module.exports = UserRouter;

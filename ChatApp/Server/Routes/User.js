const express = require("express");
const UserRouter = express.Router();

const { getAllUsers, getUserProfile } = require("../Controllers/User");
const { asyncWrap } = require("../Error");

UserRouter.route("/users").get(asyncWrap(getAllUsers));
UserRouter.route("/profile").get(asyncWrap(getUserProfile));

module.exports = UserRouter;

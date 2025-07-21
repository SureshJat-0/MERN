const express = require("express");
const UserRouter = express.Router();

const { getAllUsers } = require("../Controllers/User");
const { asyncWrap } = require("../Error");

UserRouter.route("/users").get(asyncWrap(getAllUsers));

module.exports = UserRouter;

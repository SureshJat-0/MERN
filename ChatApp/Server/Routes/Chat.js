const express = require("express");
const ChatRouter = express.Router();
const {
  handleMessagePost,
  handleGetAllMessages,
} = require("../Controllers/Chat");
const { asyncWrap } = require("../Error");
const { isAuthenticated } = require("../Controllers/Auth");


ChatRouter.route("/message").post(isAuthenticated, asyncWrap(handleMessagePost));
ChatRouter.route("/messages").post(isAuthenticated, asyncWrap(handleGetAllMessages));

module.exports = ChatRouter;

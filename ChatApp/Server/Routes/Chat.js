const express = require("express");
const ChatRouter = express.Router();
const {
  handleMessagePost,
  handleGetAllMessages,
} = require("../Controllers/Chat");
const { asyncWrap } = require("../Error");

ChatRouter.route("/message").post(asyncWrap(handleMessagePost));
ChatRouter.route("/messages").post(asyncWrap(handleGetAllMessages));

module.exports = ChatRouter;

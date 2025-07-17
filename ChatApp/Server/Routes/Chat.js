const express = require("express");
const ChatRouter = express.Router();
const { handleMessagePost, handleGetAllMessages } = require("../Controllers/Chat");

ChatRouter.route("/message").post(handleMessagePost);
ChatRouter.route('/messages').post(handleGetAllMessages);

module.exports = ChatRouter;

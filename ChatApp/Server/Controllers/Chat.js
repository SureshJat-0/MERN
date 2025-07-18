const Chat = require("../Models/Chat");
const Message = require("../Models/Message");

function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

const handleMessagePost = async (req, res) => {
  const { message, sender } = req.body;
  const messageObj = new Message({
    content: message,
    sender: sender._id,
  });
  if (req.body.receiver) {
    messageObj.receiver = req.body.receiver._id;
  }
  if (req.body.group) {
    messageObj.group = req.body.group;
  }
  // saving the message on Message Db
  const messageRes = await messageObj.save();
  await messageRes.populate([
    { path: "sender", select: "username" },
    { path: "receiver", select: "username" },
  ]);
  // getting chat key
  let chatId;
  if (messageRes.receiver) {
    // private chat
    chatId = getKey(messageRes.sender.username, messageRes.receiver.username);
  } else {
    chatId = messageRes.group; // group chat
  }
  // updating chat on Chat Db
  const participants = [messageRes.sender._id, messageRes.receiver?._id].filter(
    Boolean
  ); // to not add null when receiver is not exist
  const chat = await Chat.findOneAndUpdate(
    { chatId },
    {
      $setOnInsert: {
        // if chatId not found it will create chatId and participants
        chatId,
        participants,
      },
      $push: {
        messages: messageRes._id,
      },
    },
    { upsert: true, new: true }
  );
  res.json(chat);
};

const handleGetAllMessages = async (req, res) => {
  const { senderUsername, receiverUsername, groupName } = req.body;
  let chatKey;
  // for group channel
  if (!receiverUsername) {
    chatKey = groupName;
  } else {
    // private chat
    chatKey = getKey(senderUsername, receiverUsername);
  }
  const userMessages = await Chat.find(
    { chatId: chatKey },
    { messages: 1, _id: 0 }
  ).populate([
    {
      path: "messages",
      populate: [
        { path: "sender", select: "username -_id" },
        { path: "receiver", select: "username -_id" },
      ],
    },
  ]);
  res.json(userMessages[0]?.messages || []);
};

module.exports = {
  handleMessagePost,
  handleGetAllMessages,
};

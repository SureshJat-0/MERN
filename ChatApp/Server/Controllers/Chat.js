const Chat = require("../Models/Chat");
const Message = require("../Models/Message");

function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

const handleMessagePost = async (req, res) => {
  const { message, sender } = req.body;
  const MessageObj = new Message({
    content: message,
    sender: sender._id,
  });
  if (req.body.receiver) {
    MessageObj.receiver = req.body.receiver._id;
  }
  if (req.body.group) {
    MessageObj.group = req.body.group;
  }
  // saving the message
  const messageRes = await MessageObj.save();
  await messageRes.populate([
    { path: "sender", select: "username" },
    { path: "receiver", select: "username" },
  ]);
  // getting chat key
  const chatId = getKey(
    messageRes.sender.username,
    messageRes.receiver?.username || MessageObj?.group
  );
  console.log(messageRes);
  console.log(chatId);
  // updating chat
  const chat = await Chat.findOneAndUpdate(
    { chatId },
    {
      $setOnInsert: {
        // if chatId not found it will create chatId and participants
        chatId,
        participants: [messageRes.sender._id, messageRes.receiver?._id],
      },
      $push: {
        messages: messageRes._id,
      },
    },
    { upsert: true, new: true }
  );
  res.json(messageRes);
};

const handleGetAllMessages = async (req, res) => {
  const { senderUsername, receiverUsername } = req.body;
  const keyChat = getKey(senderUsername, receiverUsername);
  const userMessages = await Chat.find(
    { chatId: keyChat },
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

const { CustomError } = require("../Error");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");

function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

const handleMessagePost = async (req, res) => {
  const { message, sender, receiver, group } = req.body;
  // All validations
  if (!message)
    // if message not found
    return res
      .status(400)
      .json({ status: "fail", message: "Message required!" });
  if (!sender)
    // if user not found
    return res
      .status(400)
      .json({ status: "fail", message: "sender is required!" });
  if (!receiver && !group)
    // atleast one not found (receiver or group)
    return res
      .status(400)
      .json({ status: "fail", message: "Receiver or Group required!" });
  if (typeof sender !== "object" || !sender._id || !sender.username)
    // if sender object is not correct
    return res.status(400).json({
      status: "fail",
      message: "sender must be an object with an _id and username properties!",
    });
  if (
    // if receiver object is not correct
    receiver &&
    (typeof receiver !== "object" || !receiver._id || !receiver.username)
  )
    return res.status(400).json({
      status: "fail",
      message:
        "Receiver must be an object with an _id and username properties!",
    });
  // store message in message and chat db
  const messageObj = new Message({
    message,
    sender: sender._id,
  });
  if (req.body.receiver) {
    messageObj.receiver = req.body.receiver._id;
  }
  if (req.body.group) {
    messageObj.group = req.body.group;
  }
  const messageRes = await messageObj.save();
  await messageRes.populate([
    { path: "sender", select: "username -_id" },
    { path: "receiver", select: "username -_id" },
  ]);
  let chatId; // getting chat key
  if (messageRes.receiver) {
    // private chat
    chatId = getKey(messageRes.sender.username, messageRes.receiver.username);
  } else {
    // group chat
    chatId = messageRes.group;
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
  res.json(messageRes);
};

const handleGetAllMessages = async (req, res) => {
  const { senderUsername, receiverUsername, groupName } = req.body;
  // validations
  if (
    (!senderUsername && !receiverUsername && !groupName) || // if all fields are empty
    (senderUsername && !receiverUsername && !groupName) || // if sender but not receiver and group
    (receiverUsername && !senderUsername && !groupName) // if receiver but not sender and group
  )
    return res.status(400).json({
      status: "fail",
      message: "Incorrect fields are given!",
    });
  let chatKey;
  if (!receiverUsername) {
    // group channel
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

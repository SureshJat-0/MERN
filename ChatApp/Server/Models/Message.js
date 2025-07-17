const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  group: {
    type: String,
  },
});

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;

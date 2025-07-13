const { Server } = require("socket.io");

let messages = {};
let groupMessages = {};

// getting key for users
function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

function socketFunction(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connect", (socket) => {
    socket.on("userSelected", (data) => {
      if (socket.currentRoom) socket.leave(socket.currentRoom);
      const keyChar = getKey(data.currentUser.username, data.chatUser.username);
      socket.join(keyChar);
      socket.currentRoom = keyChar;
      if (!messages[keyChar]) messages[keyChar] = [];
      io.to(keyChar).emit("getServerMsgs", messages[keyChar]);
    });

    // group messages
    socket.on("groupJoin", (groupName) => {
      if (socket.currentRoom) socket.leave(socket.currentRoom);
      socket.join(groupName);
      socket.currentRoom = groupName;
      if (!groupMessages[groupName]) groupMessages[groupName] = [];
      io.to(groupName).emit("getServerMsgs", groupMessages[groupName]);
    });

    // messages
    socket.on("message", (msgData) => {
      // group messages
      if (msgData.currentGroup) {
        const groupMessage = {
          sender: msgData.senderUsername,
          content: msgData.message,
          timestamp: Date.now(),
        };
        if (!groupMessages[msgData.currentGroup])
          groupMessages[msgData.currentGroup] = [];
        groupMessages[msgData.currentGroup].push(groupMessage);
        io.to(msgData.currentGroup).emit(
          "getServerMsgs",
          groupMessages[msgData.currentGroup]
        );
        // 1-on-1 messages
      } else {
        const key = getKey(msgData.senderUsername, msgData.receiverUsername);
        const message = {
          sender: msgData.senderUsername,
          content: msgData.message,
          timestamp: Date.now(),
        };
        if (!messages[key]) messages[key] = [];
        messages[key].push(message);
        io.to(key).emit("getServerMsgs", messages[key]);
      }
    });

    // typing
    // socket.on("typing", (typingData) => {
    //   io.to(typingData.chatUser.socketId).emit("user-typing", typingData);
    // });
    // socket.on("stop-typing", (typingData) => {
    //   io.to(typingData.chatUser.socketId).emit("user-stop-typing", typingData);
    // });

    // filtering disconnected users
    socket.on("disconnect", () => {
      // users = users.filter((user) => user.socketId != socket.id);
      // io.emit("newUserJoin", users);
    });
  });
}

module.exports = socketFunction;

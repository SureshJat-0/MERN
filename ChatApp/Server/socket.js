const { Server } = require("socket.io");

// getting key for users
function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

function socketFunction(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
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
    });
    // group messages
    socket.on("groupJoin", (groupName) => {
      if (socket.currentRoom) socket.leave(socket.currentRoom);
      socket.join(groupName);
      socket.currentRoom = groupName;
    });
    // messages
    socket.on("message", (messageData) => {
      io.to(socket.currentRoom).emit("chat", messageData);
    });
  });
}

module.exports = socketFunction;

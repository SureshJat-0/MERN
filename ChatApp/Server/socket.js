const { Server } = require("socket.io");

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
    });

    // group messages
    socket.on("groupJoin", (groupName) => {
      if (socket.currentRoom) socket.leave(socket.currentRoom);
      socket.join(groupName);
      socket.currentRoom = groupName;
    });

    // messages
    socket.on("message", (messageData) => {
        io.to(socket.currentRoom).emit('chat', messageData);
    });

    // typing
    // socket.on("typing", (typingData) => {
    //   io.to(typingData.chatUser.socketId).emit("user-typing", typingData);
    // });
    // socket.on("stop-typing", (typingData) => {
    //   io.to(typingData.chatUser.socketId).emit("user-stop-typing", typingData);
    // });

    // filtering disconnected users
    socket.on("disconnect", () => {});
  });
}

module.exports = socketFunction;

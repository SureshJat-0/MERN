const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

let users = [];
let messages = {};
let groupMessages = {};

// getting key for users
function getKey(userA, userB) {
  return [userA, userB].sort().join("_");
}

io.on("connect", (socket) => {
  // joining the server when login
  socket.on("joinServer", (userData) => {
    console.log("server joined", userData.username);
    userData.socketId = socket.id;
    if (!users.some((user) => user.username === userData.username)) {
      users.push(userData); // preventing duplicate user login
    }
    io.emit("newUserJoin", users); // sending all users to frontend
  });

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
    if (msgData.groupChat) {
      const groupMessage = {
        sender: msgData.senderUsername,
        content: msgData.message,
        timestamp: Date.now(),
      };
      if (!groupMessages[msgData.groupChat])
        groupMessages[msgData.groupChat] = [];
      groupMessages[msgData.groupChat].push(groupMessage);
      io.to(msgData.groupChat).emit(
        "getServerMsgs",
        groupMessages[msgData.groupChat]
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

  // filtering disconnected users
  socket.on("disconnect", () => {
    users = users.filter((user) => user.socketId != socket.id);
    io.emit("newUserJoin", users);
  });
});

server.listen(3000, () => console.log("server started!"));

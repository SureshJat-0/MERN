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
    users.push(userData);
    // sending all users to frontend
    io.emit("newUserJoin", users);
    // join general room in starting
    socket.emit('groupJoin', 'general');
  });

  socket.on("userSelected", (data) => {
    socket.isGroupChat = false;
    for (let room of socket.rooms) {
      if (room != socket.id) socket.leave(room);
    }
    const keyChar = getKey(data.currentUser.username, data.chatUser.username);
    socket.join(keyChar);
    if (!messages[keyChar]) messages[keyChar] = [];
    io.to(keyChar).emit("getServerMsgs", messages[keyChar]);
  });

  // group messages
  socket.on("groupJoin", (groupName) => {
    socket.join(groupName);
    socket.isGroupChat = true;
    socket.groupName = groupName;
    if(!groupMessages[groupName]) groupMessages[groupName] = [];
    io.to(groupName).emit('getServerMsgs', groupMessages[groupName]);
  });

  // messages
  socket.on("message", (msgData) => {
    // group messages
    if (socket.isGroupChat) {
      const groupMessage = {
        sender: msgData.senderUsername,
        content: msgData.messageInput,
        timestamp: Date.now(),
      };
      if(!groupMessage[socket.groupName]) groupMessage[socket.groupName] = [];
      groupMessages[socket.groupName].push(groupMessage);
      io.to(socket.groupName).emit("getServerMsgs", groupMessages[socket.groupName]);
      console.log(messages);
      // one on one messages
    } else {
      const key = getKey(msgData.senderUsername, msgData.receiverUsername);
      const message = {
        sender: msgData.senderUsername,
        content: msgData.messageInput,
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

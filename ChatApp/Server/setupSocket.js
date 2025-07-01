const { Server } = require("socket.io");

function setupSocket(server) {
  const io = new Server(server, {
    cors: "http://localhost:5173",
    methods: ["GET", "POST"],
  });
  io.on("connection", (socket) => {
    console.log("New user connected: ", socket.id);
    socket.on("message", (msg, callback) => {
      console.log(
        `${new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        })}; New message: ${msg}`
      );
      callback(msg);
      io.emit("chat-msg", {
        msg: msg,
        senderId: socket.id,
        senderNickname: socket.nickname,
      });
    });
    socket.on("delivery-ack", (data) => {
      const senderSocket = io.sockets.sockets.get(data.senderId);
      if (senderSocket) {
        // sending ack to sender that msg received
        senderSocket.emit("delivered-to-user", {
          msg: data.msg,
          receiverId: socket.id,
          receiverNickname: socket.nickname,
        });
      }
    });
    socket.on("set-nickname", (nickname) => {
      socket.nickname = nickname;
      console.log(`Nickname for id:${socket.id} is:${socket.nickname}`);
    });
  });
}

module.exports = {
  setupSocket,
};

const http = require('http');
const express = require('express');
const port = 3000;
const path = require('path');
// import Socket from socket.io
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
    // getting chat-msg form the client
    socket.on("chat-msg", (msg, callback) => {
        console.log('New Message:', msg);
        callback(null, 'Received your message!');
        // emit to every socket
        io.emit('message', {msg, senderNickname: socket.nickname, senderId: socket.id});
    });
    // getting acknowledgement form the server
    socket.on('delivery-ack', (data) => {
        // find the sender id
        const senderSocket = io.sockets.sockets.get(data.senderId);
        if(senderSocket) {
            // sending the acknowledgement to sender that we received the data
            senderSocket.emit('delivered-to-user', {
                msg: data.msg,
                receiverNickname: socket.nickname, // receiver nickname
                receiverSocket: socket.id, // receiver id
            })
        }
    })

    // setting nickname for socket
    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        console.log(`Nick-name for socketId: ${socket.id} is: "${socket.nickname}"`);
    })
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

server.listen(port, () => {
    console.log(`server started at port : ${port}`);
})
const http = require('http');
const express = require('express');
const port = 3000;
const cors = require('cors');
const { setupSocket } = require('./setupSocket.js');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
setupSocket(server);


app.get('/', (req, res) => {
    res.send({status: 'ok'});
})

server.listen(port, ()=> {
    console.log(`Server started: http://localhost:${port}/`);
})


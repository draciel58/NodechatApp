const express = require("express");
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`server on port ${port}`));

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname,'public')));

let socketsConnected = new Set();

const onConnected = (socket) => {
    console.log("socket connected", socket.id);
    socketsConnected.add(socket.id);

    io.emit('clients-total', socketsConnected.size)

    socket.on('disconnect', () => {
        console.log("socket disconnected", socket.id);
        socketsConnected.delete(socket.id);
        io.emit('clients-total', socketsConnected.size)
    })
    socket.on('message', (data) => {
        socket.broadcast.emit('chat-message', data);
    })
}

io.on('connection', onConnected);
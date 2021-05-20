const PORT = process.env.PORT || 3000;
const express = require("express");
const http = require("http");
const path = require("path");
const useSocket = require("socket.io");
const RpslsLogic = require('../GameLogic/rspls.js')

const server = express();


server.use(express.static(path.join(__dirname, "src")))

const io = useSocket(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket']
    }
})

let waitingPlayer = null

io.on('connection', socket => {
    socket.emit('connection')

    if (waitingPlayer) {
        waitingPlayer.emit('redirect')
        RpslsLogic(waitingPlayer, socket)
        waitingPlayer = null
    } else {
        waitingPlayer = socket
        waitingPlayer.emit('message', 'Waiting for an opponent')
    }


    socket.on('message', messageText => {
        io.emit('message', messageText)
    })
    })

server.listen(PORT,() => console.log("Server started on port 3000..."));


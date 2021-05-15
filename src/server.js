const express = require("express");
const http = require("http");
const path = require("path");
const useSocket = require("socket.io");
const RpslsLogic = require('./rspls.js')

const app = express();
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, "src")))

const io = useSocket(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        credentials: true,
        transports: ['websocket']
    }
})

let waitingPlayer = null

let sockets = []

io.on("connection", socket => {

    // let id = Math.floor(Math.random()*900000) + 100000
    // sessions[id] = socket
    // console.log('user ' + id)
    socket.emit('player-connected')

    if (waitingPlayer) {
        socket.emit('redirect')
        RpslsLogic(waitingPlayer, socket)
        waitingPlayer = null
    } else {
        waitingPlayer = socket
        waitingPlayer.emit('message', 'Waiting for an opponent')
    }
})


const port = 5000;

server.listen(port, () => console.log("Server started on port 5000..."));


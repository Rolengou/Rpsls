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



io.on('connection', socket => {
    socket.emit('connection')

    if (waitingPlayer) {
        socket.emit('redirect')
        RpslsLogic(waitingPlayer, socket)
        waitingPlayer = null
        console.log('user with id ' + socket.id)
    } else {
        waitingPlayer = socket
        waitingPlayer.emit('message', 'Waiting for an opponent')
        console.log('user with id ' + socket.id)
    }
    // socket.on('message', (text) => {
    //     io.emit('message', text);
    // });
                    // if (waitingPlayer.length == 2) {
        //     socket.emit('redirect')
        //     RpslsLogic(waitingPlayer[0], socket)
        //     console.log('user with id ' + socket.id)
        //     waitingPlayer = []
        // } else {
        //     waitingPlayer.push(socket)
        //     socket.emit('player-connected', socket.id)
        //     socket.emit('message', 'Waiting for an opponent')
        //     console.log('user with id ' + socket.id)
        //}
    })

const port = 5000;

server.listen(port, () => console.log("Server started on port 5000..."));


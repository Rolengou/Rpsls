const PORT = process.env.PORT || 8000;
const express = require("express");
const http = require("http");
const path = require("path");
const useSocket = require("socket.io");
const RpslsLogic = require('../GameLogic/rspls.js')

const index = path.join(__dirname, 'src')

const server = express()
    .use((req, res) => {res.sendFile(index)})
    .listen(PORT, () => console.log("listening on port 8000"))

const io = useSocket(server)

let waitingPlayer = null

io.on('connection', socket => {git
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

// const app = express();
// const server = http.createServer(app)
//
// app.use(express.static(path.join(__dirname, "src")))
//
// const io = useSocket(server, {
//     cors: {
//         origin: '*',
//         methods: ["GET", "POST"],
//         credentials: true,
//         transports: ['websocket']
//     }
// })
//
// let waitingPlayer = null
//
// io.on('connection', socket => {
//     socket.emit('connection')
//
//     if (waitingPlayer) {
//         waitingPlayer.emit('redirect')
//         RpslsLogic(waitingPlayer, socket)
//         waitingPlayer = null
//     } else {
//         waitingPlayer = socket
//         waitingPlayer.emit('message', 'Waiting for an opponent')
//     }
//
//
//     socket.on('message', messageText => {
//         io.emit('message', messageText)
//     })
//     })
//
// server.listen(PORT,() => console.log("Server started on port 5000..."));
//

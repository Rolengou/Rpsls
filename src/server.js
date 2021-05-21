// const express = require("express");
// const http = require("http");
// const path = require("path");
// const useSocket = require("socket.io");
const RpslsLogic = require('./GameLogic/rspls.js')

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
const express = require('express');
const path = require('path');

const app = express();

/***SERVER***/
const port = process.env.PORT || 5000;
server = app.listen(port, function(){
    console.log('App is listening on port ' + port)
});


/***SOCKET.IO***/
const socket = require('socket.io');
io = socket(server);

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
// // const port = process.env.PORT || 3000
//
// const ip='127.0.0.1';
// const port ='3001' ;
//
// server.listen( ip, port, () => console.log("Server started on port 3000..."));


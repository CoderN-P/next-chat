const express = require('express');
const server = express();

// Create a new http server to host websocket connections
const http = require('http');
const httpServer = http.createServer(server);

const { Server } = require('socket.io');

const { readUser } = require('../db');


const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

readUser('', 'neel.parpia@gmail.com').then((user) => {
    console.log(user);
});

io.on('connection', (socket) => {
    io.on('join', (room) => {
        socket.join(room);
    });

    socket.on('message', (message) => {
        const newMessage = message;
        newMessage.remove('chatID')
        createMessage(newMessage, message.chatID).then(() => {
            io.to(message.chatID).emit('message', message);
        });
    });
});



const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});




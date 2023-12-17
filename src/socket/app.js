const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const { readChat, createMessage, createChat, updateUser, updateChat, readUser, db } = require('../db');
const {Message, Chat} = require('../types');
const server = express();
const httpServer = http.createServer(server);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});


io.on('connection', (socket) => {
    socket.on('join', (room) => {
        socket.join(room);
    });

    socket.on('message', (message) => {
        const newMessage = Message.convertFromJSON(message.message);
        console.log(newMessage);
        createMessage(newMessage, message.chatID).then(() => {
            socket.to(message.chatID).emit('new_message', message, {except: socket.id});
        });
    });

    socket.on('new_chat', async (chat) => {
        const dataObj = Chat.convertFromJSON(chat);
        await createChat(dataObj);
        socket.join(dataObj._id);
        const socketChat = {
            new: true,
            chat: dataObj,
        }
        socket.emit('new_chat', socketChat);
    });

    socket.on('join_chat', async (data) => {
        const chatID = data.chatID;
        const userID = data.userID;
        const chat = await readChat(chatID);
        if (chat) {
            if (chat.users.includes(userID)) {
                socket.emit('create_chat_error', {"error": 'User already in chat'});
                return;
            }
            const updateUserParams = {
                $addToSet: {chats: chatID},
            }
            const updateChatParams = {
                $addToSet: {users: userID},
            }
            await updateUser(userID, updateUserParams);
            await updateChat(chatID, updateChatParams);
            socket.join(chatID);
            const user = await readUser(userID);
            socket.to(chatID).emit('new_user', {chatID: chatID, user: user}, {except: socket.id});
            const socketChat = {
                new: false,
                chat: chat,
            }
            socket.emit('new_chat', socketChat);
        } else {
            socket.emit('create_chat_error', {"error": "Chat not found"});
        }
    })
});



const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});




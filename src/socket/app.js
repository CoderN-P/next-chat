const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const { readChat, createMessage, createChat, updateUser, updateChat, readUser, db } = require('../db');
const {Message, Chat} = require('../types');
const { ObjectId } = require('mongodb');
const server = express();
const httpServer = http.createServer(server);

const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});


io.on('connection', (socket) => {
    io.on('join', (room) => {
        socket.join(room);
    });

    socket.on('message', (message) => {
        const newMessage = Message.convertFromJSON(message.message);
        createMessage(newMessage, message.chatID).then(() => {
            io.to(message.chatID).emit('new_message', message);
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
            if (userID in chat.users) {
                socket.emit('error', 'User already in chat');
                return;
            }
            const updateUserParams = {
                $addToSet: {chats: chatID},
            }
            const updateChatParams = {
                $addToSet: {users: userID},
            }
            const userCollection = db.collection('users');
            const chatCollection = db.collection('chats');
            await userCollection.updateOne({_id: ObjectId.createFromHexString(userID)}, updateUserParams);
            await chatCollection.updateOne({_id: chatID}, updateChatParams);
            socket.join(chatID);
            const user = await readUser(userID);
            socket.broadcast.to(chatID).emit('new_user', {chatID: chatID, user: user});
            const socketChat = {
                new: false,
                chat: chat,
            }
            socket.emit('new_chat', socketChat);
        } else {
            socket.emit('error', 'Chat not found');
        }
    })
});



const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});




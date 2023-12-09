// Create a new express server to host websocket connections
express = require('express');
const server = express();

// Create a new http server to host websocket connections
const http = require('http');
const httpServer = http.createServer(server);

// Create a new socket.io server to host websocket connections
const { Server } = require('socket.io');
const io = new Server(httpServer);

// Import MongoDB connection
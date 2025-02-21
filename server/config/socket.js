require('dotenv').config();
const { createServer } = require('http');
const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('🔹 User Connected:', socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`✅ ${userId} is now online.`);
  }

  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('❌ User Disconnected:', socket.id);

    const userIdToRemove = Object.keys(userSocketMap).find(
      (key) => userSocketMap[key] === socket.id,
    );

    if (userIdToRemove) {
      delete userSocketMap[userIdToRemove];
      console.log(`🚫 ${userIdToRemove} removed from online users.`);
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server };

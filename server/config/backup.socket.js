require('dotenv').config();
const express = require('express');
const redis = require('./redis.js');
const { Server } = require('socket.io');
const { createServer } = require('http');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST || '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

const userSocketMap = new Map();

function getReceiverSocketId(userId) {
  return userSocketMap.get(userId);
}

io.on('connection', async (socket) => {
  console.log('✅ A user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap.set(userId, socket.id);
    socket.userId = userId;

    await redis.setex(`user_status:${userId}`, 300, 'online');

    io.emit('user_status_update', { userId, status: 'online' });
  }

  socket.on('disconnect', async () => {
    console.log('❌ A user disconnected:', socket.id);

    if (socket.userId) {
      userSocketMap.delete(socket.userId);

      // Tunggu 10 detik sebelum mengubah status ke offline (untuk menangani reconnect)
      setTimeout(async () => {
        if (!userSocketMap.has(socket.userId)) {
          await redis.setex(`user_status:${socket.userId}`, 300, 'offline');

          io.emit('user_status_update', {
            userId: socket.userId,
            status: 'offline',
          });
        }
      }, 10000);
    }
  });
});

module.exports = { io, app, server, getReceiverSocketId };

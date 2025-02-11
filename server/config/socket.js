require('dotenv').config();
const { createServer } = require('http');
const express = require('express');
const { Server } = require('socket.io');
const redis = require('./redis.js');

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_HOST || '*',
    methods: ['GET', 'POST'],
  },
  transports: ['websocket'],
});

const userSocketMap = {};

function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on('connection', async (socket) => {
  console.log('✅ A user connected:', socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    socket.userId = userId;

    // 🔹 Simpan status user online di Redis dengan TTL 5 menit
    await redis.set(`user_status:${userId}`, 'online', 'EX', 300);

    io.emit('user_status_update', { userId, status: 'online' });
  }

  socket.on('disconnect', async () => {
    console.log('❌ A user disconnected:', socket.id);

    if (socket.userId) {
      delete userSocketMap[socket.userId];

      // 🔹 Simpan last seen di Redis
      const lastSeen = new Date().toISOString();
      await redis.set(`user_status:${socket.userId}`, `last_seen:${lastSeen}`);

      io.emit('user_status_update', {
        userId: socket.userId,
        status: `last_seen:${lastSeen}`,
      });
    }
  });
});

module.exports = { io, app, server, getReceiverSocketId };

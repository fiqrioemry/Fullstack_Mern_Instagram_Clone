require('dotenv').config();
const express = require('express');
const cors = require('cors');
const services = require('./routes');
const cookies = require('cookie-parser');
const { app, server } = require('./config/socket');
const passport = require('passport');
const limiter = require('./middleware/limiter');
const router = require('./routes');

const CLIENT_HOST = process.env.CLIENT_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

// app.use(limiter);
app.use(cookies());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
  }),
);
app.use(passport.initialize());
// route configuration
app.use('/api/auth', router.authRoute);
app.use('/api/user', services.userRoute);
app.use('/api/post', services.postRoute);
app.use('/api/chat', services.chatRoute);
app.use('/api/notifcation', services.notificationRoute);

server.listen(SERVER_PORT, () => {
  console.log(`✅ Connected to Server on port ${SERVER_PORT}`);
});

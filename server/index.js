require('dotenv').config();
const express = require('express');
const cors = require('cors');
const services = require('./routes');
const cookies = require('cookie-parser');
const { app, server } = require('./config/socket');
const router = require('./routes');

const CLIENT_HOST = process.env.CLIENT_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

app.use(cookies());
app.use(express.json({ limit: '10mb' }));
app.use(cors({ origin: CLIENT_HOST, credentials: true }));

app.use('/api/auth', router.authRoute);
app.use('/api/user', services.userRoute);
app.use('/api/post', services.postRoute);
app.use('/api/chat', services.chatRoute);

server.listen(SERVER_PORT, () => {
  console.log(`Server connected on port ${SERVER_PORT}`);
});

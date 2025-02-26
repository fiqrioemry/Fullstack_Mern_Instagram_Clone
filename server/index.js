require('dotenv').config();
require('./config/passport');
const cors = require('cors');
const express = require('express');
const services = require('./routes');
const cookieParser = require('cookie-parser');
const limiter = require('./middleware/limiter');
const passport = require('passport');

// socket
const { createServer } = require('http');
const { initializeSocket } = require('./config/socket');

const app = express();
const httpServer = createServer(app);
initializeSocket(httpServer);

const CLIENT_HOST = process.env.CLIENT_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

app.use(limiter);
app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(
  cors({
    origin: CLIENT_HOST,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
  }),
);

// route configuration
app.use('/api/auth', services.authRoute);
app.use('/api/user', services.userRoute);
app.use('/api/post', services.postRoute);
app.use('/api/chat', services.chatRoute);
app.use('/api/notifcation', services.notificationRoute);

httpServer.listen(SERVER_PORT, () => {
  console.log(`✅ Connected to Server on port ${SERVER_PORT}`);
});

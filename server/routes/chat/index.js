const express = require('express');
const { upload } = require('../../middleware/media');
const {
  sendChat,
  getChat,
  getChats,
  getOnlineUsers,
} = require('../../controller/chat');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/', isAuthenticate, getChats);
router.get('/:receiverId', isAuthenticate, getChat);
router.post('/', upload('image').single('file'), isAuthenticate, sendChat);

router.get('/user-status/:userId', isAuthenticate, getOnlineUsers);

module.exports = router;

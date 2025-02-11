const express = require('express');
const { upload } = require('../../middleware/media');
const {
  sendMessage,
  getMessages,
  getAllChat,
  getOnlineUsers,
} = require('../../controller/chat');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/user-status/:userId', isAuthenticate, getOnlineUsers);
router.get('/', isAuthenticate, getAllChat);
router.get('/message/:receiverId', isAuthenticate, getMessages);
router.post(
  '/message',
  upload('image').single('file'),
  isAuthenticate,
  sendMessage,
);

module.exports = router;

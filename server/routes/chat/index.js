const express = require('express');
const { upload } = require('../../middleware/media');
const {
  sendMessage,
  getMessages,
  getAllChat,
} = require('../../controller/chat');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

router.get('/', isAuthenticate, getAllChat);
router.get('/message/:chat_id', isAuthenticate, getMessages);
router.post(
  '/message',
  upload('image').single('file'),
  isAuthenticate,
  sendMessage,
);
// 🔹 Buat chat baru (tanpa chat_id)

module.exports = router;

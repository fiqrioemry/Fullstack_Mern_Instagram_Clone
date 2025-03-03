const router = require('express').Router();
const chat = require('../../controller/chat');
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/', isAuthenticate, chat.getChats);
router.get('/:receiverId', isAuthenticate, chat.getChat);
router.post(
  '/:receiverId',
  upload().single('image'),
  isAuthenticate,
  chat.sendChat,
);

module.exports = router;

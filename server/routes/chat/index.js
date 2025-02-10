const express = require('express');
const { sendMessage, getMessage } = require('../../controller/chat');
const router = express.Router();

router.post('/send', sendMessage);
router.get('/messages/:chat_id', getMessage);

module.exports = router;

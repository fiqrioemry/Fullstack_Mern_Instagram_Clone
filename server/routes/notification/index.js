const express = require('express');
const {
  getNotifications,
  markAsRead,
} = require('../../controller/notification');
const router = express.Router();

router.get('/:user_id', getNotifications);
router.put('/:user_id/read', markAsRead);

module.exports = router;

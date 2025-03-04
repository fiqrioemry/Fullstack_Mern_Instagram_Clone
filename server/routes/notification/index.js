const {
  markAsRead,
  getNotifications,
} = require('../../controller/notification');
const router = require('express').Router();
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/:userId', isAuthenticate, getNotifications);
router.put('/:userId', markAsRead);

module.exports = router;

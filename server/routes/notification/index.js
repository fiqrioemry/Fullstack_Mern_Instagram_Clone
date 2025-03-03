const router = require('express').Router();
const notif = require('../../controller/notification');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.put('/:userId', notif.markAsRead);
router.get('/:userId', isAuthenticate, notif.getNotifications);

module.exports = router;

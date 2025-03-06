const { Notification, User } = require('../../models');

async function getNotifications(req, res) {
  const receiverId = req.user.userId;

  try {
    const notifications = await Notification.findAll({ where: { receiverId } });

    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function markAsRead(req, res) {
  const receiverId = req.user.userId;
  try {
    await Notification.update({ isRead: true }, { where: { receiverId } });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getNotifications, markAsRead };

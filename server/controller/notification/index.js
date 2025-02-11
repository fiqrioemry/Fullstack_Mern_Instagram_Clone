const { Notification } = require('../../models');

async function getNotifications(req, res) {
  const { receiverId } = req.params;

  try {
    const notifications = await Notification.findAll({
      where: { receiverId },
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Notification.associations.sender,
          as: 'sender',
          attributes: ['id', 'username'],
        },
      ],
    });

    res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve notifications' });
  }
}

async function markAsRead(req, res) {
  const { receiverId } = req.params;

  try {
    await Notification.update({ isRead: true }, { where: { receiverId } });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update notifications' });
  }
}

module.exports = { getNotifications, markAsRead };

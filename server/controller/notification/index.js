const { Notification } = require('../../models');

async function getNotifications(req, res) {
  const receiverId = req.params.receiverId;

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
    res.status(500).json({ message: error.message });
  }
}

async function markAsRead(req, res) {
  const receiverId = req.params.receiverId;
  try {
    await Notification.update({ isRead: true }, { where: { receiverId } });
    res.status(200).json({ message: 'Notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { getNotifications, markAsRead };

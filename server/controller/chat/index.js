const fs = require('fs').promises;
const { Op } = require('sequelize');
const redis = require('../../config/redis.js');
const cassandra = require('../../config/cassandra');
const { Chat, Profile, User } = require('../../models');
const { io, getReceiverSocketId } = require('../../config/socket');
const { uploadMediaToCloudinary } = require('../../utils/cloudinary');

async function getChats(req, res) {
  const userId = req.user.userId;
  try {
    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
      ],
    });

    const chatList = await Promise.all(
      chats.map(async (chat) => {
        const chatPartner =
          chat.senderId === userId ? chat.senderId : chat.receiverId;

        let status = await redis.get(`user_status:${chatPartner.id}`);
        if (!status) status = 'offline';

        return {
          chatId: chat.id,
          userId: chatPartner.userId,
          username: chatPartner.username,
          avatar: chatPartner.profile.avatar,
          status,
        };
      }),
    );

    res.status(200).json(chatList);
  } catch (error) {
    console.error('❌ Error fetching chat list:', error);
    res.status(500).json({ message: 'Failed to retrieve chat list' });
  }
}

async function sendChat(req, res) {
  const file = req.file;
  const senderId = req.user.userId;
  let { chatId, message, receiverId } = req.body;

  try {
    if (!senderId || !receiverId) {
      return res
        .status(400)
        .json({ message: 'Sender ID and Receiver ID are required' });
    }

    if (!chatId) {
      const existingChat = await Chat.findOne({
        where: {
          [Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });

      if (existingChat) {
        chatId = existingChat.id;
      } else {
        const newChat = await Chat.create({
          senderId,
          receiverId,
        });
        chatId = newChat.id;
      }
    }

    let media_url = '';
    let timestamp = new Date();

    if (file && file.path) {
      try {
        let uploadedImage = await uploadMediaToCloudinary(file.path);
        media_url = uploadedImage.secure_url;
        await fs.unlink(file.path);
      } catch (error) {
        if (file.path) await fs.unlink(file.path);
        return res.status(500).json({ message: 'Failed to upload media' });
      }
    }

    const query =
      'INSERT INTO messages (chat_id, sender_id, receiver_id, message, media_url, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
    const newChat = await cassandra.execute(
      query,
      [chatId, senderId, receiverId, message, media_url, timestamp],
      { prepare: true },
    );

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive_message', {
        chatId,
        senderId,
        receiverId,
        message,
        media_url,
        timestamp,
      });

      io.to(receiverSocketId).emit('new_notification', {
        senderId,
        message: 'New message received',
      });
    }

    res.status(200).json({ message: 'Chat is sent' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to send chat', error: error.message });
  }
}

async function getChat(req, res) {
  const senderId = req.user.userId;
  const receiverId = req.params.receiverId;

  try {
    const prevChat = await Chat.findOne({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
        {
          model: User,
          as: 'user2',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
      ],
    });

    if (!prevChat) {
      return res.status(200).json({ message: 'Start a new chat', chat: [] });
    }

    const chat_id = prevChat.id;
    const query = `SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp DESC`;
    const result = await cassandra.execute(query, [chat_id], { prepare: true });

    if (!result || result.rows.length === 0) {
      return res.status(404).json({ message: 'No message found in history' });
    }

    const chat = result.rows;

    res.status(200).json({ chat });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve messages', error: error.message });
  }
}

async function getOnlineUsers(req, res) {
  try {
    const { userId } = req.params;
    let status = await redis.get(`user_status:${userId}`);
    if (!status) status = 'offline';

    res.status(200).json({ userId, status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get user status' });
  }
}
module.exports = { getChats, getChat, sendChat, getOnlineUsers };

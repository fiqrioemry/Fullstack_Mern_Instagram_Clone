const fs = require('fs').promises;
const { Op } = require('sequelize');
const redis = require('../../config/redis.js');
const cassandra = require('../../config/cassandra');
const { Chat, Profile, User } = require('../../models');
const { io, getReceiverSocketId } = require('../../config/socket.js');
const { uploadMediaToCloudinary } = require('../../utils/cloudinary');

async function getChats(req, res) {
  const userId = req.user.userId;
  try {
    const chatsData = await Chat.findAll({
      where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] },
      include: [
        {
          model: User,
          as: 'sender',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile', attributes: ['avatar'] },
        },
        {
          model: User,
          as: 'receiver',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile', attributes: ['avatar'] },
        },
      ],
    });

    // Ambil semua status user dari Redis
    const keys = await redis.keys('user_status:*');
    const onlineUsers = new Set();
    for (const key of keys) {
      const userId = key.split(':')[1];
      const status = await redis.get(key);
      if (status === 'online') {
        onlineUsers.add(parseInt(userId));
      }
    }

    const chats = chatsData.map((chat) => {
      const chatPartner =
        chat.senderId === userId ? chat.receiver : chat.sender;

      return {
        chatId: chat.id,
        userId: chatPartner.id,
        username: chatPartner.username,
        avatar:
          chatPartner.profile?.avatar ||
          `https://api.dicebear.com/5.x/adventurer/svg?seed=${chatPartner.username}`,
        status: onlineUsers.has(chatPartner.id) ? 'online' : 'offline',
      };
    });

    res.status(200).json(chats);
  } catch (error) {
    console.error('❌ Error fetching chat list:', error);
    res
      .status(500)
      .json({ message: 'Failed to retrieve chat list', error: error.message });
  }
}

async function sendChat(req, res) {
  const file = req.file;
  const senderId = req.user.userId;
  const receiverId = req.params.receiverId;
  let { chatId, message } = req.body;

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

    if (file?.buffer) {
      try {
        const uploadedImage = await uploadMediaToCloudinary(
          file.buffer,
          file.mimetype,
        );
        media_url = uploadedImage.secure_url;
        await fs.unlink(file.path);
      } catch (error) {
        return res.status(500).json({ message: 'Failed to upload image' });
      }
    }

    const query =
      'INSERT INTO messages (chat_id, sender_id, receiver_id, message, media_url, timestamp) VALUES (?, ?, ?, ?, ?, ?)';
    await cassandra.execute(
      query,
      [chatId, senderId, receiverId, message, media_url, timestamp],
      { prepare: true },
    );

    const newChat = {
      chatId,
      senderId,
      receiverId,
      message,
      media_url,
      timestamp,
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newChat);
    }

    res.status(200).json({ message: 'Chat is sent', newChat });
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
          as: 'receiver',
          attributes: ['id', 'username'],
          include: { model: Profile, as: 'profile' },
        },
      ],
    });

    if (!prevChat) {
      return res.status(200).json({ message: 'Start a new chat', chat: [] });
    }

    const chat_id = prevChat.id;
    const query = `SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC`;
    const result = await cassandra.execute(query, [chat_id], { prepare: true });

    if (!result || result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: 'no chat found in history', chat: [] });
    }

    const chat = result.rows;

    res.status(200).json({ message: 'Success fetch chat', chat });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to retrieve Chat', error: error.message });
  }
}

module.exports = { getChats, getChat, sendChat };

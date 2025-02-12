const { User, Post, Profile, Comment, Notification } = require('../../models');

// Fungsi untuk mengekstrak username dari mention (@username)
function extractMentions(content) {
  const mentionRegex = /@(\w+)/g; // Regex untuk mencocokkan @username
  const matches = [...content.matchAll(mentionRegex)];
  return matches.map((match) => match[1]); // Ambil hanya username
}

async function createComment(req, res) {
  const { userId } = req.user;
  const { content, parentId } = req.body;
  const { postId } = req.params;

  try {
    // 1. Cari post berdasarkan ID
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    let receiverId = post.userId; // Default pemilik post yang menerima notifikasi
    let type = 'comment'; // Jenis notifikasi default

    // 2. Jika ini reply (balasan ke komentar lain)
    if (parentId) {
      const parentComment = await Comment.findByPk(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }

      receiverId = parentComment.userId; // Pemilik komentar utama yang menerima notifikasi
      type = 'reply'; // Jenis notifikasi berubah menjadi "reply"
    }

    // 3. Buat komentar baru
    const newComment = await Comment.create({
      userId,
      postId,
      parentId: parentId || null,
      content,
    });

    // 4. Kirim notifikasi jika user yang mengomentari bukan pemilik post/comment
    if (receiverId !== userId) {
      await Notification.create({
        receiverId, // Penerima notifikasi
        senderId: userId, // Pengirim notifikasi
        postId,
        commentId: newComment.id,
        type, // "comment" atau "reply"
      });
    }

    // 5. **Implementasi Mention dalam Komentar**
    const mentionedUsernames = extractMentions(content); // Ambil semua username yang disebut
    if (mentionedUsernames.length > 0) {
      const mentionedUsers = await User.findAll({
        where: { username: mentionedUsernames },
        attributes: ['id', 'username'],
      });

      // 6. Buat notifikasi mention untuk setiap user yang disebut
      await Promise.all(
        mentionedUsers.map((mentionedUser) =>
          Notification.create({
            receiverId: mentionedUser.id,
            senderId: userId,
            postId,
            commentId: newComment.id,
            type: 'mention',
          }),
        ),
      );
    }

    return res.status(201).json('Comment added successfully');
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: error.message,
    });
  }
}

async function createReplies(req, res) {
  const { userId } = req.user;
  const { content, parentId } = req.body;
  const { postId, commentId } = req.params;

  try {
    // 1. Cari post berdasarkan ID
    const post = await Post.findByPk(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    let receiverId = post.userId; // Default pemilik post yang menerima notifikasi
    let type = 'comment'; // Jenis notifikasi default

    // 2. Jika ini reply (balasan ke komentar lain)
    if (parentId) {
      const parentComment = await Comment.findByPk(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: 'Parent comment not found' });
      }

      receiverId = parentComment.userId; // Pemilik komentar utama yang menerima notifikasi
      type = 'reply'; // Jenis notifikasi berubah menjadi "reply"
    }

    // 3. Buat komentar baru
    const newComment = await Comment.create({
      userId,
      postId,
      parentId: parentId || null,
      content,
    });

    // 4. Kirim notifikasi jika user yang mengomentari bukan pemilik post/comment
    if (receiverId !== userId) {
      await Notification.create({
        receiverId, // Penerima notifikasi
        senderId: userId, // Pengirim notifikasi
        postId,
        commentId: newComment.id,
        type, // "comment" atau "reply"
      });
    }

    // 5. **Implementasi Mention dalam Komentar**
    const mentionedUsernames = extractMentions(content); // Ambil semua username yang disebut
    if (mentionedUsernames.length > 0) {
      const mentionedUsers = await User.findAll({
        where: { username: mentionedUsernames },
        attributes: ['id', 'username'],
      });

      // 6. Buat notifikasi mention untuk setiap user yang disebut
      await Promise.all(
        mentionedUsers.map((mentionedUser) =>
          Notification.create({
            receiverId: mentionedUser.id,
            senderId: userId,
            postId,
            commentId: newComment.id,
            type: 'mention',
          }),
        ),
      );
    }

    return res.status(201).json('Comment added successfully');
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add comment',
      error: error.message,
    });
  }
}

async function getComments(req, res) {
  const { postId } = req.params;

  try {
    const commentsData = await Comment.findAll({
      where: { postId, parentId: null },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: Comment,
          as: 'replies',
          include: [
            {
              model: Comment,
              as: 'replies',
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
      ],
    });

    const comments = commentsData.map((comment) => {
      return {
        id: comment.postId,
        commentId: comment.id,
        userId: comment.userId,
        username: comment.user.username,
        avatar: comment.user.profile.avatar,
        content: comment.content,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
        replies: comment.replies.length,
      };
    });
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get comments',
      error: error.message,
    });
  }
}

async function getReplies(req, res) {
  const { postId, commentId } = req.params;

  try {
    const repliesData = await Comment.findAll({
      where: { postId, parentId: commentId },
      order: [['createdAt', 'ASC']],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
      ],
    });

    const replies = repliesData.map((reply) => {
      return {
        replyId: reply.id,
        postId: reply.postId,
        commentId: reply.parentId,
        content: reply.content,
        userId: reply.userId,
        username: reply.username,
        avatar: reply.avatar,
        createdAt: reply.createdAt,
        updatedAt: reply.updatedAt,
      };
    });

    return res.status(200).json(replies);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get replies',
      error: error.message,
    });
  }
}

async function deleteComment(req, res) {
  const { userId } = req.user;
  const { commentId } = req.params;

  try {
    const comment = await Comment.findOne({ where: { id: commentId } });

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.userId !== userId) {
      return res
        .status(403)
        .json({ message: 'Unauthorized to delete this comment' });
    }

    await comment.destroy();

    return res.status(200).json({ message: 'Comment is deleted' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to delete comment',
      error: error.message,
    });
  }
}

module.exports = {
  getComments,
  createComment,
  deleteComment,
  getReplies,
};

const { User, Profile, Reply } = require("../../models");

async function createReply(req, res) {
  const { userId } = req.user;
  const { content } = req.body;
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByPk(commentId);

    if (!comment)
      return res.status(404).send({
        success: false,
        message: "Comment is not found",
      });

    await Comment.create({
      userId,
      commentId,
      content,
    });
    return res
      .status(201)
      .send({ success: true, message: "Replies is created" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to Reply on comment",
      error: error.message,
    });
  }
}

async function getReplies(req, res) {
  const { commentId } = req.params;
  const { limit } = req.query;
  const total = parseInt(limit) || 10;

  try {
    const replies = await Reply.findAll({
      limit: total,
      where: { commentId },
      order: [["createdAt", "ASC"]],
      attributes: ["id", "content", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "username"],
          include: [
            {
              model: Profile,
              attributes: ["fullname", "avatar"],
            },
          ],
        },
      ],
    });

    if (replies.length === 0)
      return res
        .status(200)
        .send({ success: true, message: "No Replies", data: [] });

    const replyResult = await Promise.all(
      replies.map(async (reply) => {
        const likeCount = await reply.countLikes();

        const { id: replyId, content, createdAt, User } = reply;
        const { id: userId, username, Profile } = User;
        const { fullname, avatar } = Profile;

        return {
          userId,
          replyId,
          content,
          createdAt,
          username,
          fullname,
          avatar,
          likeCount,
        };
      })
    );

    return res.status(200).send({
      success: true,
      data: replyResult,
    });
  } catch (error) {
    // Menangani error
    return res.status(500).send({
      success: false,
      message: "Failed to get comments",
      error: error.message,
    });
  }
}

async function updateReply(req, res) {
  // Logic to update a specific reply
}

async function deleteReply(req, res) {
  // Logic to delete a specific reply
}

// replyController.js
async function likeReply(req, res) {
  // Logic to like a specific reply
}

async function unlikeReply(req, res) {
  // Logic to unlike a specific reply
}

module.exports = {
  createReply,
  getReplies,
  updateReply,
  deleteReply,
  likeReply,
  unlikeReply,
};

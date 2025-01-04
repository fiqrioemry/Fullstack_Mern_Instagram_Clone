const { User, Profile, Post, Comment } = require("../../models");

// commentController.js
async function createComment(req, res) {
  const { userId } = req.user;
  const { content } = req.body;
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId);

    if (!post)
      return res.status(404).send({
        success: false,
        message: "Post is not found",
      });

    await Comment.create({
      userId,
      postId,
      content,
    });
    return res
      .status(201)
      .send({ success: true, message: "Comment is created" });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to comment a post",
      error: error.message,
    });
  }
}

async function getComments(req, res) {
  const { postId } = req.params;
  const { limit } = req.query;
  const total = parseInt(limit) || 10;

  try {
    const comments = await Comment.findAll({
      limit: total,
      where: { postId },
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

    if (comments.length === 0)
      return res
        .status(200)
        .send({ success: true, message: "No Comments yet", data: [] });

    const commentResult = await Promise.all(
      comments.map(async (comment) => {
        const replyCount = await comment.countReplies();
        const likeCount = await comment.countLikes();

        const { id: commentId, content, createdAt, User } = comment;
        const { id: userId, username, Profile } = User;
        const { fullname, avatar } = Profile;

        return {
          userId,
          commentId,
          content,
          createdAt,
          username,
          fullname,
          avatar,
          replyCount,
          likeCount,
        };
      })
    );

    return res.status(200).send({
      success: true,
      data: commentResult,
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

async function updateComment(req, res) {
  // Logic to update a specific comment
}

async function deleteComment(req, res) {
  // Logic to delete a specific comment
}

// commentController.js
async function likeComment(req, res) {
  // Logic to like a specific comment
}

async function unlikeComment(req, res) {
  // Logic to unlike a specific comment
}

module.exports = {
  getComments,
  likeComment,
  updateComment,
  createComment,
  deleteComment,
  unlikeComment,
};

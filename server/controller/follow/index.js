const { User, Profile, Follow } = require("../../models");
const { Op } = require("sequelize");

async function followNewUser(req, res) {
  const { userId } = req.user;
  const { followingId } = req.params;

  try {
    if (userId == followingId) {
      return res.status(400).send({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const user = await User.findByPk(followingId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followingId: followingId },
    });

    if (existingFollow) {
      return res.status(400).send({
        success: false,
        message: "You are already following this user",
      });
    }

    await Follow.create({
      followerId: userId,
      followingId: followingId,
    });

    res.status(201).send({
      success: true,
      message: "Follow is success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to follow new user",
      error: error.message,
    });
  }
}

async function unfollowUser(req, res) {
  const { userId } = req.user;
  const { followingId } = req.params;

  try {
    if (userId === followingId) {
      return res.status(400).send({
        success: false,
        message: "Cannot unfollow yourself",
      });
    }

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (!followRecord) {
      return res.status(400).send({
        success: false,
        message: "You are not following this user",
      });
    }
    await followRecord.destroy();

    res.status(200).send({
      success: true,
      message: "Unfollow is success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to unfollow user",
      error: error.message,
    });
  }
}

async function getUserFollowers(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followers = await user.getFollowers({
      attributes: ["id", "username"],
      include: [{ model: Profile, attributes: ["fullname"] }],
    });

    res.status(200).send({
      success: true,
      data: followers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get followers detail",
      error: error.message,
    });
  }
}

async function getUserFollowings(req, res) {
  const { username } = req.params;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followings = await user.getFollowings({
      attributes: ["id", "username"],
      include: [{ model: Profile, attributes: ["fullname"] }],
    });

    res.status(200).send({
      success: true,
      data: followings,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get followings detail",
      error: error.message,
    });
  }
}

async function getFollowRecommendations(req, res) {
  const { userId } = req.user;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const followedUsers = await user.getFollowings({
      attributes: ["id"],
    });

    const followedIds = followedUsers.map((follow) => follow.id);

    const recommendations = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.notIn]: followedIds,
        },
      },
      attributes: ["id", "username"],
      include: [
        {
          model: Profile,
          attributes: ["fullname", "avatar"],
        },
      ],
    });
    const data = recommendations.map((item) => item.dataValues);

    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to retrieve follow recommendations",
      error: error.message,
    });
  }
}

module.exports = {
  followNewUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowings,
  getFollowRecommendations,
};

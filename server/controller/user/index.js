const { User, Profile } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");

// get user profile
const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username", "email"],
      include: [{ model: Profile }],
    });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const [followingsCount, followersCount, postsCount] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.countPosts(),
    ]);

    return res.status(200).send({
      success: true,
      data: {
        user: user,
        profile: user.Profile,
        posts: postsCount,
        followers: followersCount,
        followings: followingsCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrive user home details",
      error: error.message,
    });
  }
};

async function updateUserProfile(req, res) {
  const { userId } = req.user;

  const { firstname, lastname, bio, birthday, gender, avatar } = req.body;

  try {
    const profileData = await Profile.findOne({ where: { userId } });

    if (!profileData) {
      return res
        .status(404)
        .send({ success: false, message: "Profile not found" });
    }

    let updatedAvatar = avatar;

    if (req.file) {
      const newAvatar = await uploadMediaToCloudinary(req.file.path);
      updatedAvatar = newAvatar.secure_url;
    }

    const isDataUpdated =
      profileData.firstname === firstname &&
      profileData.lastname === lastname &&
      profileData.bio === bio &&
      profileData.birthday === birthday &&
      profileData.gender === gender &&
      profileData.avatar === updatedAvatar;

    if (isDataUpdated) {
      return res.status(400).send({
        success: false,
        message: "No changes detected. Please modify the data before updating.",
      });
    }

    profileData.firstname = firstname;
    profileData.lastname = lastname;
    profileData.bio = bio;
    profileData.birthday = birthday;
    profileData.gender = gender;
    profileData.avatar = updatedAvatar;

    await profileData.save();

    return res.status(200).send({
      success: true,
      message: "Profile is updated.",
      data: profileData,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
}

async function followUser(req, res) {
  // Logic for following a user
}

async function unfollowUser(req, res) {
  // Logic for unfollowing a user
}

// userController.js
async function getFollowers(req, res) {
  // Logic for fetching followers of a user
}

async function getFollowings(req, res) {
  // Logic for fetching users that a user is following
}

async function getFollowRecommend(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found  " });
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
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  updateUserProfile,
  getFollowRecommend,
};

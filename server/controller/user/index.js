const { Op } = require("sequelize");
const { User, Profile, Follow } = require("../../models");
const { uploadMediaToCloudinary } = require("../../utils/cloudinary");

async function searchUser(req, res) {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).send({
        success: false,
        message: "Query parameter 'query' is required",
      });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [{ username: { [Op.like]: `%${query}%` } }],
      },
      attributes: ["id", "username"],
      include: [
        {
          model: Profile,
          attributes: ["fullname", "avatar"],
          where: {
            fullname: { [Op.like]: `%${query}%` }, // Tambahkan pencarian di Profile
          },
          required: false, // Pastikan include tetap bekerja jika fullname tidak cocok
        },
      ],
      limit: 10,
    });

    if (users.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).send({
      success: true,
      data: users.map((user) => ({
        userId: user.id,
        username: user.username,
        fullname: user.Profile?.fullname || null,
        avatar: user.Profile?.avatar || null,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to search for users",
      error: error.message,
    });
  }
}

async function getUserProfile(req, res) {
  const { username } = req.params;
  try {
    const user = await User.findOne({
      where: { username },
      attributes: ["id", "username", "email"],
      include: [
        {
          model: Profile,
          attributes: ["fullname", "gender", "avatar", "bio", "birthday"],
        },
      ],
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
        userId: user.id,
        username: user.username,
        email: user.email,
        fullname: user.Profile.fullname,
        avatar: user.Profile.avatar,
        bio: user.Profile.bio,
        gender: user.Profile.gender,
        birthday: user.Profile.birthday,
        posts: postsCount,
        followers: followersCount,
        followings: followingsCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrive user detail",
      error: error.message,
    });
  }
}

async function updateUserProfile(req, res) {
  const { userId } = req.user;

  const { fullname, bio, birthday, gender, avatar } = req.body;

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
      profileData.fullname === fullname &&
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

    profileData.fullname = fullname;
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
  const { userId } = req.user;
  const { followingId } = req.params;
  const followId = parseInt(followingId);
  try {
    if (userId == followingId) {
      return res.status(400).send({
        success: false,
        message: "Cannot follow yourself",
      });
    }

    const user = await User.findByPk(followId);

    if (!user) {
      return res.status(404).send({ error: "User not found " });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followingId: followId },
    });

    if (existingFollow) {
      return res.status(400).send({
        success: false,
        message: "You are already following this user",
      });
    }

    await Follow.create({
      followerId: userId,
      followingId: followId,
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

async function getFollowers(req, res) {
  const { userId } = req.user; // ID pengguna saat ini
  const { username } = req.params; // Username pengguna target

  try {
    // Ambil ID user berdasarkan username
    const user = await User.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Jalankan dua operasi fetching secara paralel
    const [userFollowers, myFollowings] = await Promise.all([
      user.getFollowers({
        limit: 10,
        attributes: ["id", "username"],
        include: [
          {
            model: Profile,
            attributes: ["fullname", "avatar"],
          },
        ],
      }),
      User.findByPk(userId, {
        include: {
          model: User,
          as: "Followings",
          attributes: ["id"],
        },
      }),
    ]);

    if (userFollowers.length === 0) {
      return res
        .status(200)
        .send({ message: "User has no followers", data: [] });
    }

    // Ekstrak daftar ID followings kita
    const myFollowingIds = myFollowings.Followings.map((f) => f.id);

    // Tandai followers yang juga kita ikuti
    const enrichedFollowers = userFollowers.map((follower) => ({
      userId: follower.id,
      username: follower.username,
      fullname: follower.Profile.fullname,
      avatar: follower.Profile.avatar,
      isFollowedByMe: myFollowingIds.includes(follower.id), // Periksa apakah kita mengikuti mereka
    }));

    res.status(200).send({
      success: true,
      data: enrichedFollowers,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get user followers",
      error: error.message,
    });
  }
}

async function getFollowings(req, res) {
  const { userId } = req.user; // ID pengguna saat ini
  const { username } = req.params; // Username pengguna target

  try {
    // Fetch ID user berdasarkan username
    const user = await User.findOne({
      where: { username },
      attributes: ["id"],
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Jalankan dua query secara paralel
    const [userFollowings, myFollowings] = await Promise.all([
      user.getFollowings({
        limit: 10,
        attributes: ["id", "username"],
        include: [{ model: Profile, attributes: ["fullname", "avatar"] }],
      }),
      User.findByPk(userId, {
        include: {
          model: User,
          as: "Followings",
          attributes: ["id"],
        },
      }),
    ]);

    const followings = userFollowings.map((following) => ({
      userId: following.id,
      username: following.username,
      fullname: following.Profile.fullname,
      avatar: following.Profile.avatar,
    }));

    const myFollowingIds = myFollowings.Followings.map((f) => f.id);

    const enrichedFollowings = followings.map((f) => ({
      ...f,
      isFollowedByMe: myFollowingIds.includes(f.userId),
    }));

    res.status(200).send({
      success: true,
      data: enrichedFollowings,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Failed to get user followings",
      error: error.message,
    });
  }
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
          attributes: ["avatar"],
        },
      ],
    });
    const data = recommendations.map((user) => ({
      userId: user.id,
      username: user.username,
      avatar: user.Profile?.avatar || null,
    }));

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
  searchUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  updateUserProfile,
  getFollowRecommend,
};

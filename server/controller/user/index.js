const fs = require('fs').promises;
const { Op } = require('sequelize');
const { User, Profile, Post, sequelize } = require('../../models');
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require('../../utils/cloudinary');

async function searchUser(req, res) {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({
        message: "Query parameter 'query' is required",
      });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [{ username: { [Op.like]: `%${query}%` } }],
      },
      attributes: ['id', 'username'],
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['fullname', 'avatar'],
          where: {
            fullname: { [Op.like]: `%${query}%` }, // Tambahkan pencarian di Profile
          },
          required: false, // Pastikan include tetap bekerja jika fullname tidak cocok
        },
      ],
      limit: 5,
    });

    if (users.length === 0) {
      return res.status(404).json({
        message: 'No users found',
      });
    }

    return res.status(200).json({
      success: true,
      data: users.map((user) => ({
        userId: user.id,
        username: user.username,
        fullname: user.profile?.fullname || null,
        avatar: user.profile?.avatar || null,
      })),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Failed to search for users',
      error: error.message,
    });
  }
}

// tested
async function getMyProfile(req, res) {
  const { userId } = req.user;

  try {
    const user = await User.findOne({
      where: { id: userId },
      include: {
        model: Profile,
        as: 'profile',
      },
    });

    if (!user && user.length === 0) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const payload = {
      userId: user.id,
      username: user.username,
      email: user.email,
      fullname: user.profile.fullname,
      avatar: user.profile.avatar,
      bio: user.profile.bio,
      gender: user.profile.gender,
      birthday: user.profile.birthday,
    };

    return res.status(200).json({ payload });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve user detail',
      error: error.message,
    });
  }
}

async function updateMyProfile(req, res) {
  const { userId } = req.user;
  const file = req.file;
  const { fullname, bio, birthday, gender } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const profile = await Profile.findOne({ where: { userId }, transaction });

    if (!profile) {
      if (file && file.path) {
        await fs.unlink(file.path);
      }
      return res.status(404).json({ message: 'Profile not found' });
    }

    let avatar = profile.avatar;
    let uploadedImage;

    const isUpdated =
      profile.bio !== bio ||
      profile.gender !== gender ||
      profile.birthday !== birthday ||
      profile.fullname !== fullname;

    if (!isUpdated) {
      if (file && file.path) {
        await fs.unlink(file.path);
      }
      await transaction.rollback();
      return res.status(400).json({
        message: 'No changes detected. Please modify the data before updating.',
      });
    }

    if (file && file.path) {
      try {
        uploadedImage = await uploadMediaToCloudinary(file.path);

        if (profile.avatar) {
          await deleteMediaFromCloudinary(profile.avatar);
        }

        avatar = uploadedImage.secure_url;

        await fs.unlink(file.path);
      } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
    }

    profile.bio = bio;
    profile.gender = gender;
    profile.birthday = birthday;
    profile.fullname = fullname;
    profile.avatar = avatar;

    await profile.save({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: 'Profile is updated successfully.',
    });
  } catch (error) {
    await transaction.rollback(); // Rollback semua kalo error
    return res.status(500).json({
      message: 'Failed to update profile',
      error: error.message,
    });
  }
}

async function getUserProfile(req, res) {
  const { userId } = req.user;
  const { username } = req.params;

  try {
    const user = await User.findOne({
      where: { username },
      include: [
        {
          model: Profile,
          as: 'profile',
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        },
      ],
    });

    if (!user) {
      return res.status(404).json('User not found');
    }

    const [followingsCount, followersCount, postsCount] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.countPosts(),
    ]);

    const isMyProfile = user.id === userId;

    const profile = {
      userId: user.id,
      username: user.username,
      fullname: user.profile.fullname,
      avatar: user.profile.avatar,
      bio: user.profile.bio,
      gender: user.profile.gender,
      posts: postsCount,
      followers: followersCount,
      followings: followingsCount,
      isMyProfile: isMyProfile,
      isFollowing: user.Followers.some((follow) => follow.id === userId),
    };

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to retrieve user profile');
  }
}

async function getFollowRecommend(req, res) {
  const { userId } = req.user;
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found  ' });
    }

    const followedUsers = await user.getFollowings({
      attributes: ['id'],
    });

    const followedIds = followedUsers.map((follow) => follow.id);

    const recommendations = await User.findAll({
      where: {
        id: {
          [Op.ne]: userId,
          [Op.notIn]: followedIds,
        },
      },
      attributes: ['id', 'username'],
      include: [
        {
          model: Profile,
          attributes: ['avatar'],
        },
      ],
    });
    const data = recommendations.map((user) => ({
      userId: user.id,
      username: user.username,
      avatar: user.profile?.avatar || null,
    }));

    res.status(200).json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve follow recommendations',
      error: error.message,
    });
  }
}

module.exports = {
  searchUser,
  getMyProfile,
  updateMyProfile,
  getUserProfile,
  getFollowRecommend,
};

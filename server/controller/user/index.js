const { Op } = require('sequelize');
const { User, Profile, sequelize } = require('../../models');
const uploadToCloudinary = require('../../utils/uploadToCloudinary');
const deleteFromCloudinary = require('../../utils/deleteFromCloudinary');

async function updateProfile(req, res) {
  const file = req.file;
  const userId = req.user.userId;
  const transaction = await sequelize.transaction();
  const { fullname, bio, birthday, gender } = req.body;

  try {
    const profile = await Profile.findOne({ where: { userId }, transaction });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    let avatar = profile.avatar;
    let uploadedImage;

    const isUpdated =
      (bio && profile.bio !== bio) ||
      (gender && profile.gender !== gender) ||
      (birthday && profile.birthday !== birthday) ||
      (fullname && profile.fullname !== fullname) ||
      file;

    if (!isUpdated) {
      return res.status(400).json({
        message: 'No changes detected',
      });
    }

    if (file?.buffer) {
      try {
        uploadedImage = await uploadToCloudinary(file.buffer, file.mimetype);

        if (profile.avatar) {
          await deleteFromCloudinary(profile.avatar);
        }

        avatar = uploadedImage.secure_url;
      } catch (error) {
        await transaction.rollback();
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
    }

    profile.avatar = avatar;
    profile.bio = bio || profile.bio;
    profile.gender = gender || profile.gender;
    profile.birthday = birthday || profile.birthday;
    profile.fullname = fullname || profile.fullname;

    await profile.save({ transaction });

    await transaction.commit();

    return res.status(200).json({
      message: 'Profile updated.',
    });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({
      message: 'Failed to update profile',
      error: error.message,
    });
  }
}

async function searchUser(req, res) {
  const { query } = req.query;
  try {
    const usersData = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${query}%` } },
          { '$profile.fullname$': { [Op.like]: `%${query}%` } },
        ],
      },
      attributes: ['id', 'username'],
      include: [
        {
          model: Profile,
          as: 'profile',
          attributes: ['fullname', 'avatar'],
        },
      ],
      limit: 5,
    });

    if (usersData.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }

    const users = usersData.map((user) => ({
      userId: user.id,
      username: user.username,
      fullname: user.profile?.fullname || null,
      avatar: user.profile?.avatar || null,
    }));

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to search for users',
      error: error.message,
    });
  }
}

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

    const profile = {
      userId: user.id,
      email: user.email,
      username: user.username,
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      gender: user.profile.gender,
      fullname: user.profile.fullname,
      birthday: user.profile.birthday,
    };

    return res.status(200).json(profile);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve user detail',
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
      return res.status(404).json({ message: 'User not found' });
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
    return res.status(500).json({
      message: 'Failed to retrieve user profile',
      error: error.message,
    });
  }
}

module.exports = {
  searchUser,
  getMyProfile,
  updateProfile,
  getUserProfile,
};

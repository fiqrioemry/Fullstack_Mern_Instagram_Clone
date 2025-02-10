const { Op } = require('sequelize');
const { User, Profile, Follow } = require('../../models');
const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require('../../utils/cloudinary');

async function searchUser(req, res) {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({
        success: false,
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
        success: false,
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
      success: false,
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

  try {
    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      if (file && file.path) {
        await fs.unlink(file.path);
      }
      return res.status(404).json({ message: 'Profile not found' });
    }

    const isUpdated =
      profile.bio !== bio ||
      profile.gender !== gender ||
      profile.birthday !== birthday ||
      profile.fullname !== fullname ||
      profile.avatar !== avatar;

    if (!isUpdated) {
      if (file && file.path) {
        await fs.unlink(file.path);
      }
      return res.status(400).json({
        message: 'No changes detected. Please modify the data before updating.',
      });
    }

    let avatar = profile.avatar;

    if (file && file.path) {
      try {
        const uploadedImage = await uploadMediaToCloudinary(file.path);

        if (profile.avatar) {
          await deleteMediaFromCloudinary(profile.avatar);
        }

        avatar = uploadedImage.secure_url;

        await fs.unlink(file.path);
      } catch (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ message: 'Failed to upload avatar' });
      }
    }

    profile.bio = bio;
    profile.gender = gender;
    profile.birthday = birthday;
    profile.fullname = fullname;
    profile.avatar = avatar;

    await profile.save();

    return res.status(200).json({
      message: 'Profile is updated successfully.',
      profile,
    });
  } catch (error) {
    console.error('Update profile error:', error);
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
      include: {
        model: Profile,
        as: 'profile',
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const [followingsCount, followersCount, postsCount] = await Promise.all([
      user.countFollowings(),
      user.countFollowers(),
      user.countPosts(),
    ]);

    const isCurrentUser = user.id === userId;

    const payload = {
      userId: user.id,
      username: user.username,
      fullname: user.profile.fullname,
      avatar: user.profile.avatar,
      bio: user.profile.bio,
      gender: user.profile.gender,
      posts: postsCount,
      followers: followersCount,
      followings: followingsCount,
      isCurrentUser,
    };

    return res.status(200).json({
      payload,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to retrieve user detail',
      error: error.message,
    });
  }
}

async function followUser(req, res) {
  const userId = Number(req.user.userId);
  let { followingId } = req.params;
  followingId = Number(followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot follow yourself',
      });
    }

    const user = await User.findByPk(followingId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (existingFollow) {
      return res.status(409).json({
        success: false,
        message: 'Already following this user',
      });
    }

    await Follow.create({
      followerId: userId,
      followingId,
    });

    return res.status(201).json({
      message: 'Follow is successful',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to follow user',
      error: error.message,
    });
  }
}

async function unfollowUser(req, res) {
  const userId = Number(req.user.userId);
  let { followingId } = req.params;
  followingId = Number(followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot unfollow yourself',
      });
    }

    // 🔹 Cek apakah user memang mengikuti user ini
    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (!followRecord) {
      return res.status(409).json({
        success: false,
        message: 'You are not following this user',
      });
    }

    try {
      await followRecord.destroy();
    } catch (error) {
      return res.status(500).json({
        message: 'Failed to unfollow user',
        error: error.message,
      });
    }

    return res.status(200).json({
      message: 'Unfollow successful',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to process request',
      error: error.message,
    });
  }
}

async function getFollowers(req, res) {
  const { userId } = req.user;
  const { username } = req.params;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const [userFollowers, myFollowings] = await Promise.all([
      user.getFollowers({
        limit,
        attributes: ['id', 'username'],
        include: [
          { model: Profile, as: 'profile', attributes: ['fullname', 'avatar'] },
        ],
      }),
      User.findByPk(userId, {
        include: {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
      }),
    ]);

    if (!userFollowers || userFollowers.length === 0) {
      return res.status(200).json({
        message: 'User has no followers',
        data: [],
      });
    }

    const myFollowingIds = myFollowings?.Followings?.map((f) => f.id) || [];

    const followers = userFollowers.map((follower) => ({
      userId: follower.id,
      username: follower.username,
      fullname: follower.profile?.fullname || null,
      avatar: follower.profile?.avatar || null,
      isFollowedByMe: myFollowingIds.includes(follower.id),
    }));

    return res.status(200).json({
      followers,
    });
  } catch (error) {
    console.error('Error fetching followers:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user followers',
      error: error.message,
    });
  }
}

async function getFollowings(req, res) {
  const { userId } = req.user;
  const { username } = req.params;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['id'],
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const [userFollowings, myFollowings] = await Promise.all([
      user.getFollowings({
        limit,
        attributes: ['id', 'username'],
        include: [
          { model: Profile, as: 'profile', attributes: ['fullname', 'avatar'] },
        ],
      }),
      User.findByPk(userId, {
        include: {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        },
      }),
    ]);

    // Jika user tidak memiliki followings, langsung return
    if (!userFollowings || userFollowings.length === 0) {
      return res.status(200).json({
        message: 'User is not following anyone',
        data: [],
      });
    }

    const myFollowingIds = myFollowings?.Followings?.map((f) => f.id) || [];

    // Format response
    const followings = userFollowings.map((following) => ({
      userId: following.id,
      username: following.username,
      fullname: following.profile?.fullname || null,
      avatar: following.profile?.avatar || null,
      isFollowedByMe: myFollowingIds.includes(following.id),
    }));

    return res.status(200).json({
      followings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to get user followings',
      error: error.message,
    });
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
      success: false,
      message: 'Failed to retrieve follow recommendations',
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
  getMyProfile,
  updateMyProfile,
  getFollowRecommend,
};

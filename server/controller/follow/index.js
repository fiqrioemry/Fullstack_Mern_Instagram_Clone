const { User, Profile, Follow, sequelize } = require('../../models');

// tested
async function followUser(req, res) {
  const userId = Number(req.user.userId);
  let { followingId } = req.params;
  followingId = Number(followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({
        message: 'Cannot follow yourself',
      });
    }

    const user = await User.findByPk(followingId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (existingFollow) {
      return res.status(409).json({
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
      message: 'Failed to follow user',
      error: error.message,
    });
  }
}
// tested
async function unfollowUser(req, res) {
  const userId = req.user.userId;
  const followingId = parseInt(req.params.followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({
        message: 'Cannot unfollow yourself',
      });
    }

    // 🔹 Cek apakah user memang mengikuti user ini
    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    const username = followRecord.username;

    if (!followRecord) {
      return res.status(400).json('You are not following this user');
    }

    await followRecord.destroy();

    return res.status(200).json({
      message: 'Unfollowing is Success',
      username,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to process request');
  }
}
// tested
async function getFollowers(req, res) {
  const { userId } = req.user;
  const { username } = req.params;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json('User not found');
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
      return res.status(200).json([]);
    }

    const myFollowingIds = myFollowings?.Followings?.map((f) => f.id) || [];

    const followers = userFollowers.map((follower) => ({
      userId: follower.id,
      username: follower.username,
      fullname: follower.profile?.fullname || null,
      avatar: follower.profile?.avatar || null,
      isFollow: myFollowingIds.includes(follower.id),
    }));

    return res.status(200).json(followers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to get user followers');
  }
}

// tested
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

    const [userFollowings] = await Promise.all([
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

    if (!userFollowings || userFollowings.length === 0) {
      return res.status(200).json([]);
    }

    const followings = userFollowings.map((following) => ({
      userId: following.id,
      username: following.username,
      fullname: following.profile?.fullname,
      avatar: following.profile?.avatar,
    }));

    return res.status(200).json(followings);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to get user followings');
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
};

const { User, Profile, Follow } = require('../../models');

// tested
async function followUser(req, res) {
  const userId = req.user.userId;
  const followingId = parseInt(req.params.followingId);

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
      await existingFollow.update({ status: 'active' });
      return res.status(200).json({
        message: 'Follow is successful',
      });
    }

    await Follow.create({
      followerId: userId,
      followingId,
      status: 'active',
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
  console.log('MASUK MASUK MASUK MASUK');
  console.log(followingId);
  console.log(userId);
  console.log('MASUK MASUK MASUK MASUK');
  try {
    if (userId === followingId) {
      return res.status(400).json({
        message: 'Cannot unfollow yourself',
      });
    }
    const user = await User.findByPk(userId);

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    console.log('MASUK MASUK MASUK MASUK');
    console.log(followRecord);
    console.log('MASUK MASUK MASUK MASUK');
    console.log('MASUK MASUK MASUK MASUK');
    console.log('MASUK MASUK MASUK MASUK');
    console.log('MASUK MASUK MASUK MASUK');

    if (!followRecord || followRecord.status === 'inactive') {
      return res.status(400).json({
        message: 'You are not following this user',
      });
    }

    await followRecord.update({ status: 'inactive' });

    return res.status(200).json({
      message: 'Unfollowing is successful',
      username: user.username,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      message: 'Failed to process request',
      error: error.message,
    });
  }
}

// tested
async function getFollowers(req, res) {
  const userId = req.user.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json('User not found');
    }

    const userFollowers = await Follow.findAll({
      where: { followingId: user.id, status: 'active' },
      limit,
      include: [
        {
          model: User,
          as: 'follower',
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

    if (!userFollowers || userFollowers.length === 0) {
      return res.status(200).json([]);
    }

    const myFollowings = await Follow.findAll({
      where: { followerId: userId, status: 'active' },
      attributes: ['followingId'],
    });

    const myFollowingIds = myFollowings.map((f) => f.followingId);

    const followers = userFollowers.map(({ follower }) => ({
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
  const userId = req.user.userId;
  const username = req.params.username;
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

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

async function unfollowUser(req, res) {
  const userId = req.user.userId;
  const followingId = parseInt(req.params.followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json({ message: 'Cannot unfollow yourself' });
    }

    const followRecord = await Follow.findOne({
      where: { followerId: userId, followingId: 1 },
    });

    if (!followRecord || followRecord.status === 'inactive') {
      return res
        .status(400)
        .json({ message: 'You are not following this user' });
    }
    console.log(followRecord);
    await followRecord.update({ status: 'inactive' });

    return res.status(200).json({
      message: 'Unfollowing is successful',
      followingId,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: 'Failed to process request', error: error.message });
  }
}
async function getFollowers(req, res) {
  const userId = req.user.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json('User not found');
    }

    // Ambil daftar user yang mem-follow user ini
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

    if (!userFollowers.length) {
      return res.status(200).json([]);
    }

    // Ambil daftar user yang sedang login ikuti
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
    console.error(error.message);
    return res.status(500).json('Failed to get user followers');
  }
}

async function getFollowings(req, res) {
  const userId = req.user.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json('User not found');
    }

    // Ambil daftar user yang diikuti oleh user ini
    const userFollowings = await Follow.findAll({
      where: { followerId: user.id, status: 'active' },
      limit,
      include: [
        {
          model: User,
          as: 'following',
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

    if (!userFollowings.length) {
      return res.status(200).json([]);
    }

    // Ambil daftar user yang diikuti oleh user yang sedang login
    const myFollowings = await Follow.findAll({
      where: { followerId: userId, status: 'active' },
      attributes: ['followingId'],
    });

    const myFollowingIds = myFollowings.map((f) => f.followingId);

    const followings = userFollowings.map(({ following }) => ({
      userId: following.id,
      username: following.username,
      fullname: following.profile?.fullname || null,
      avatar: following.profile?.avatar || null,
      isFollow: myFollowingIds.includes(following.id),
    }));

    return res.status(200).json(followings);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Failed to get user followings');
  }
}

module.exports = {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
};

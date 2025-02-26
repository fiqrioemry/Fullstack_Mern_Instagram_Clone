const {
  User,
  Profile,
  Follow,
  sequelize,
  Notification,
} = require('../../models');

// tested
async function followUser(req, res) {
  const userId = req.user.userId;
  const t = await sequelize.transaction();
  const followingId = parseInt(req.params.followingId);

  try {
    if (userId === followingId) {
      return res.status(400).json('Cannot follow yourself');
    }

    const user = await User.findByPk(followingId);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const following = await Follow.findOne({
      where: { followerId: userId, followingId },
    });

    if (following) {
      await following.destroy({ transaction: t });

      await Notification.destroy({
        where: {
          senderId: userId,
          receiverId: followingId,
          type: 'follow',
        },
        transaction: t,
      });
      await t.commit();
      return res.status(200).json('You unfollowing this user');
    }

    await Follow.create(
      {
        followerId: userId,
        followingId,
      },
      { transaction: t },
    );
    await Notification.create(
      {
        senderId: userId,
        receiverId: followingId,
        type: 'follow',
      },
      { transaction: t },
    );

    await t.commit();
    return res.status(201).json('You Following this user');
  } catch (error) {
    await t.rollback();
    console.log(error.message);
    return res.status(500).json('Failed to follow user');
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

    const userFollowers = await Follow.findAll({
      where: { followingId: user.id },
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
      where: { followerId: userId },
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

    const userFollowings = await Follow.findAll({
      where: { followerId: user.id },
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

    const myFollowings = await Follow.findAll({
      where: { followerId: userId },
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
  getFollowers,
  getFollowings,
};

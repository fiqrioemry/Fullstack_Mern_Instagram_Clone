const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require('../../utils/cloudinary');

const {
  User,
  Post,
  Follow,
  Like,
  Profile,
  Comment,
  sequelize,
  PostGallery,
} = require('../../models');
const { Op } = require('sequelize');

// get all post from user we follow
async function getPostsFromFollowings(req, res) {
  const { userId } = req.user;
  const { limit } = req.query;

  try {
    const total = parseInt(limit) || 5;

    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      },
    });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User not found' });
    }

    const followingIds = user.Followings.map(
      (following) => following.Follow.followingId,
    );

    if (followingIds.length === 0) {
      return res.status(200).send({
        success: true,
        message: 'No posts to show, you are not following anyone.',
        data: [],
      });
    }

    const posts = await Post.findAll({
      limit: total,
      where: { userId: { [Op.in]: followingIds } },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          attributes: ['image'],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(404)
        .send({ success: false, message: 'No posts found' });
    }

    const followingPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: 'post' } }),
        ]);

        const { id: postId, content, createdAt, User } = post;
        const { id: userId, username, Profile } = User;
        const { fullname, avatar } = Profile;
        const images = post.PostGalleries.map((gallery) => gallery.image);

        return {
          userId,
          postId,
          username,
          fullname,
          avatar,
          content,
          images,
          commentCount,
          likeCount,
          createdAt,
          isOwner: false,
        };
      }),
    );

    res.status(200).send({
      success: true,
      data: followingPosts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Failed to retrieve following posts',
      error: error.message,
    });
  }
}

// get all the post of all users
async function getPublicPosts(req, res) {
  const { limit } = req.query;
  try {
    const total = parseInt(limit) || 5;
    const posts = await Post.findAll({
      limit: total,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: User,
          where: { isPrivate: false },
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          attributes: ['image'],
        },
      ],
    });

    if (!posts.length) {
      return res
        .status(404)
        .send({ success: false, message: 'No public posts found' });
    }

    const publicPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: 'post' } }),
        ]);

        const { id: postId, content, createdAt, User } = post;
        const { id: userId, username, Profile } = User;
        const { fullname, avatar } = Profile;
        const images = post.PostGalleries.map((gallery) => gallery.image);
        const isOwner = req.user.userId === userId;

        return {
          userId,
          postId,
          username,
          fullname,
          avatar,
          content,
          images,
          commentCount,
          likeCount,
          createdAt,
          isOwner,
        };
      }),
    );

    res.status(200).send({
      success: true,
      data: publicPosts,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to get public posts',
      error: error.message,
    });
  }
}

// get the detail of post
async function getPostDetail(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  try {
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          attributes: ['image'],
        },
      ],
    });

    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found' });
    }

    const commentCount = await Comment.count({ where: { postId } });
    const likeCount = await Like.count({
      where: { entityId: postId, entityType: 'post' },
    });
    const isOwner = post.User.id === userId;
    const postDetail = {
      userId: post.User.id,
      postId: post.id,
      username: post.User.username,
      fullname: post.User.Profile.fullname,
      avatar: post.User.Profile.avatar,
      content: post.content,
      images: post.PostGalleries.map((gallery) => gallery.image),
      commentCount,
      likeCount,
      createdAt: post.createdAt,
      isOwner,
    };

    res.status(200).json({ success: true, data: postDetail });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to get post details',
      error: error.message,
    });
  }
}

// create new post
async function createPost(req, res) {
  // const { userId } = req.userId;
  const userId = 1;
  const files = req.files;
  const { content } = req.body;
  try {
    if (!content || files.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'Content or images are missing' });
    }

    const newPost = await Post.create({ userId, content });

    const uploadPromises = files.map((fileItem) =>
      uploadMediaToCloudinary(fileItem.path),
    );

    const results = await Promise.all(uploadPromises);

    const images = results.map((result) => {
      return {
        postId: newPost.id,
        image: result.secure_url,
      };
    });

    await PostGallery.bulkCreate(images);

    res.status(201).send({ success: true, message: 'New post is created' });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to create new post',
      error: error.message,
    });
  }
}

async function getUserPosts(req, res) {
  const { username } = req.params;
  let { limit } = req.query;
  limit = parseInt(limit) || 5;

  try {
    // 🔹 Cek apakah user dengan username tersebut ada
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'isPrivate'],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const userId = user.id;
    const requestingUserId = req.user.userId;

    if (userId !== requestingUserId) {
      const followRecord = await Follow.findOne({
        where: { followerId: userId, followingId: requestingUserId },
      });

      if (!followRecord) {
        return res.status(403).json({
          message: 'User does not follow you. You cannot see their posts.',
          payload: [],
        });
      }
    }

    const posts = await Post.findAll({
      where: { userId },
      limit,
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'content',
        'createdAt',
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Post.id)`,
          ),
          'commentCount',
        ],
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM Likes WHERE Likes.entityId = Post.id AND Likes.entityType = 'post')`,
          ),
          'likeCount',
        ],
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
        },
        {
          model: PostGallery,
          as: 'gallery',
          attributes: ['image'],
        },
      ],
    });

    if (!posts.length) {
      return res.status(200).json({
        message: 'This user has no posts',
        payload: [],
      });
    }

    // 🔹 Format hasil agar lebih rapi
    const userPosts = posts.map((post) => ({
      userId,
      postId: post.id,
      images: post.gallery?.map((gallery) => gallery.image) || [],
      createdAt: post.createdAt,
      likeCount: post.dataValues.likeCount,
      commentCount: post.dataValues.commentCount,
    }));

    return res.status(200).json({
      userPosts,
    });
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user posts',
      error: error.message,
    });
  }
}

// update own post
async function updatePost(req, res) {
  const { postId } = req.params;
  const files = req.files; // Gambar atau file baru yang diupload
  const { userId } = req.user; // ID User yang sedang login
  const { content } = req.body; // Konten atau caption baru

  try {
    const post = await Post.findOne({
      where: { id: postId, userId },
    });

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: 'Post not found or unauthorized' });
    }

    if (content) {
      post.content = content;
    }

    if (files && files.length > 0) {
      const oldImages = await PostGallery.findAll({
        where: { postId: post.id },
      });

      const updatedImages = files.map((fileItem) =>
        uploadMediaToCloudinary(fileItem.path),
      );

      const results = await Promise.all(updatedImages);

      const newImages = results.map((result) => ({
        postId: post.id,
        image: result.secure_url, // URL gambar yang baru
      }));

      const oldImagesUrls = oldImages.map((image) => image.image);
      oldImagesUrls.forEach((imageUrl) => {
        deleteMediaFromCloudinary(imageUrl);
      });

      await PostGallery.destroy({ where: { postId: post.id } });

      await PostGallery.bulkCreate(newImages);
    }

    await post.save();

    res.status(200).json({ success: true, message: 'Post is updated' });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to get user details',
      error: error.message,
    });
  }
}

// delete own post
async function deletePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.user;

  try {
    const post = await Post.findOne({
      where: { id: postId, userId },
    });

    // Pastikan post ditemukan
    if (!post) {
      return res
        .status(404)
        .send({ success: false, message: 'Post not found or unauthorized' });
    }

    const images = await PostGallery.findAll({
      where: { postId: post.id },
    });

    images.forEach((image) => {
      deleteMediaFromCloudinary(image.image);
    });

    await PostGallery.destroy({
      where: { postId: post.id },
    });

    await post.destroy();

    res
      .status(200)
      .json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: 'Failed to get user details',
      error: error.message,
    });
  }
}

async function likePost(req, res) {}

async function unlikePost(req, res) {}

module.exports = {
  getPostsFromFollowings,
  getPublicPosts,
  getPostDetail,
  getUserPosts,
  createPost,
  updatePost,
  deletePost,
  unlikePost,
  likePost,
};

const {
  uploadMediaToCloudinary,
  deleteMediaFromCloudinary,
} = require('../../utils/cloudinary');
const fs = require('fs').promises;
const {
  User,
  Post,
  Follow,
  Like,
  Profile,
  Comment,
  Notification,
  sequelize,
  PostGallery,
} = require('../../models');
const { Op } = require('sequelize');

async function getPostsFromFollowings(req, res) {
  const userId = req.user.userId;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const followingsData = await Follow.findAll({
      where: { followerId: userId, status: 'active' },
      attributes: ['followingId'],
    });

    const followingIds = followingsData.map((follow) => follow.followingId);

    if (followingIds.length === 0) {
      return res.status(200).json({
        posts: [],
        message: 'No post to show, you not following anyone',
      });
    }

    const postsData = await Post.findAndCountAll({
      limit,
      where: { userId: { [Op.in]: followingIds } },
      include: [
        { model: Like, as: 'likes', attributes: ['id'] },
        { model: Comment, as: 'comments', attributes: ['id'] },
        { model: PostGallery, as: 'gallery', attributes: ['image'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: Profile, as: 'profile', attributes: ['avatar'] }],
        },
      ],
      distinct: true,
      order: [['createdAt', 'ASC']],
    });

    if (postsData.count === 0) {
      return res.status(200).json({ posts: [], message: 'User has no post' });
    }

    const totalPosts = postsData.count;
    const posts = postsData.rows.map((post) => ({
      userId: post.user.id,
      postId: post.id,
      username: post.user.username,
      content: post.content,
      avatar: post.user.profile?.avatar,
      images: post.gallery?.map((g) => g.image) || [],
      createdAt: post.createdAt,
      likes: post.likes.length,
      comments: post.comments.length,
    }));

    return res.status(200).json({ totalPosts, posts });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json('Failed to get posts from followings');
  }
}

async function getPostDetail(req, res) {
  const postId = req.params.postId;
  try {
    const postData = await Post.findOne({
      where: { id: postId },
      include: [
        { model: Like, as: 'likes', attributes: ['id'] },
        { model: Comment, as: 'comments', attributes: ['id'] },
        { model: PostGallery, as: 'gallery', attributes: ['image'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: Profile, as: 'profile', attributes: ['avatar'] }],
        },
      ],
    });

    if (!postData) {
      return res.status(404).json('Post not found');
    }

    const [comments, likes] = await Promise.all([
      postData.countComments(),
      postData.countLikes(),
    ]);

    const post = {
      userId: postData.user.id,
      postId: postData.id,
      username: postData.user.username,
      content: postData.content,
      avatar: postData.user.profile?.avatar,
      images: postData.gallery?.map((g) => g.image) || [],
      createdAt: postData.createdAt,
      likes: likes,
      comments: comments,
    };

    return res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to get user posts');
  }
}

async function getPublicPosts(req, res) {
  const limit = parseInt(req.query.limit) || 5;
  try {
    const postsData = await Post.findAndCountAll({
      limit,
      include: [
        { model: Like, as: 'likes', attributes: ['id'] },
        { model: Comment, as: 'comments', attributes: ['id'] },
        { model: PostGallery, as: 'gallery', attributes: ['image'] },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: Profile, as: 'profile', attributes: ['avatar'] }],
        },
      ],
      distinct: true,
      order: [['createdAt', 'ASC']],
    });

    if (postsData.count === 0) {
      return res.status(200).json({ posts: [], message: 'User has no post' });
    }

    const totalPosts = postsData.count;
    const posts = postsData.rows.map((post) => ({
      userId: post.user.id,
      postId: post.id,
      username: post.user.username,
      content: post.content,
      avatar: post.user.profile?.avatar,
      images: post.gallery?.map((g) => g.image) || [],
      createdAt: post.createdAt,
      likes: post.likes.length,
      comments: post.comments.length,
    }));

    return res.status(200).json({ totalPosts, posts });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json('Failed to get user posts');
  }
}

async function getUserPosts(req, res) {
  const userId = req.user?.userId;
  const username = req.params.username;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'isPrivate'],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isPrivate && userId !== user.id) {
      const followRecord = await Follow.findOne({
        where: { followerId: userId, followingId: user.id },
      });

      if (!followRecord) {
        return res.status(200).json({
          posts: [],
          message: 'Account is private, follow to see posts',
        });
      }
    }

    const postsData = await Post.findAndCountAll({
      where: { userId: user.id },
      limit,

      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [{ model: Profile, as: 'profile', attributes: ['avatar'] }],
        },
        { model: PostGallery, as: 'gallery', attributes: ['image'] },
        { model: Like, as: 'likes', attributes: ['id'] },
        { model: Comment, as: 'comments', attributes: ['id'] },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (postsData.count === 0) {
      return res.status(200).json({ posts: [], message: 'User has no post' });
    }

    const totalPosts = postsData.count;
    const posts = postsData.rows.map((post) => ({
      userId: post.user.id,
      postId: post.id,
      username: post.user.username,
      content: post.content,
      avatar: post.user.profile?.avatar,
      images: post.gallery?.map((g) => g.image) || [],
      createdAt: post.createdAt,
      likes: post.likes.length,
      comments: post.comments.length, // Perbaikan dari `posts.comments.length`
    }));

    return res.status(200).json({ totalPosts, posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to get user posts' });
  }
}

async function createPost(req, res) {
  const files = req.files;
  const { userId } = req.user;
  const { content } = req.body;
  const t = await sequelize.transaction();
  try {
    if (!content || files.length === 0) {
      return res.status(400).json({ message: 'Content or images are missing' });
    }

    const newPost = await Post.create({ userId, content }, { transaction: t });

    const uploadPromises = req.files.map(async (file) => {
      const uploadedMedia = await uploadMediaToCloudinary(file.path);
      await fs.unlink(file.path);
      return uploadedMedia;
    });

    const uploadedImages = await Promise.all(uploadPromises);
    const images = uploadedImages.map((url) => ({
      postId: newPost.id,
      image: url.secure_url,
    }));

    await PostGallery.bulkCreate(images, { transaction: t });

    await t.commit();

    res.status(201).json({ message: 'New post is created' });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to create new post',
      error: error.message,
    });
  }
}

async function updatePost(req, res) {
  const { postId } = req.params;
  const { userId } = req.user;
  const { content, images } = req.body;
  const t = await sequelize.transaction();

  try {
    const post = await Post.findOne({ where: { id: postId, userId } });

    if (!post) {
      await t.rollback();
      return res.status(404).json({ message: 'Post not found' });
    }

    if (content) {
      post.content = content;
      await post.save({ transaction: t });
    }

    const imagesArray = Array.isArray(images) ? images : images ? [images] : [];

    await PostGallery.destroy({
      where: {
        postId,
        image: { [Op.notIn]: imagesArray },
      },
      transaction: t,
    });

    let newImages = [];
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const uploadedMedia = await uploadMediaToCloudinary(file.path);
        await fs.unlink(file.path);
        return uploadedMedia;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      newImages = uploadedImages.map((url) => ({
        postId: post.id,
        image: url.secure_url,
      }));

      await PostGallery.bulkCreate(newImages, { transaction: t });
    }

    const imagesToDelete = await PostGallery.findAll({
      where: {
        postId,
        image: { [Op.notIn]: imagesArray },
      },
    });

    for (const img of imagesToDelete) {
      await deleteMediaFromCloudinary(img.image);
    }

    await t.commit();

    res.status(200).json({ message: 'Post is updated' });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: 'Failed to update post',
      error: error.message,
    });
  }
}

async function deletePost(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  const t = await sequelize.transaction();

  try {
    // 🔹 1. Cari post yang akan dihapus
    const post = await Post.findOne({
      where: { id: postId, userId },
      transaction: t,
    });

    // 🔹 2. Pastikan post ditemukan dan milik user yang benar
    if (!post) {
      await t.rollback();
      return res
        .status(404)
        .json({ message: 'Post not found or unauthorized' });
    }

    // 🔹 3. Ambil semua gambar terkait dari database
    const images = await PostGallery.findAll({
      where: { postId: post.id },
      attributes: ['image'],
      transaction: t,
    });

    // 🔹 4. Hapus semua gambar dari Cloudinary secara asinkron
    const deleteImagePromises = images.map(async (img) => {
      await deleteMediaFromCloudinary(img.image);
    });
    await Promise.all(deleteImagePromises);

    // 🔹 5. Hapus semua gambar dari database
    await PostGallery.destroy({
      where: { postId: post.id },
      transaction: t,
    });

    // 🔹 6. Hapus post dari database
    await post.destroy({ transaction: t });

    // 🔹 7. Commit transaksi jika semuanya berhasil
    await t.commit();

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    // 🔹 8. Rollback transaksi jika terjadi kesalahan
    await t.rollback();
    return res.status(500).json({
      message: 'Failed to delete post',
      error: error.message,
    });
  }
}

async function likePost(req, res) {
  const { userId } = req.user;
  const { entityId, entityType } = req.body;
  const t = await sequelize.transaction();

  try {
    // 1. Validasi tipe entity yang bisa di-like
    const validTypes = ['post', 'comment'];
    if (!validTypes.includes(entityType)) {
      await t.rollback();
      return res.status(400).json({ message: 'Invalid entity type' });
    }

    // 2. Cek apakah user sudah melakukan like sebelumnya
    const existingLike = await Like.findOne({
      where: { userId, entityId, entityType },
      paranoid: false,
      transaction: t,
    });

    if (existingLike) {
      if (existingLike.deletedAt) {
        await existingLike.update({ deletedAt: null }, { transaction: t });
        await t.commit();
        return res.status(200).json({ message: 'Like restored' });
      }
      await t.rollback();
      return res.status(400).json({ message: 'Already liked' });
    }

    // 3. Tentukan pemilik entity yang menerima notifikasi
    let receiverId = null;
    if (entityType === 'post') {
      const post = await Post.findByPk(entityId);
      if (!post) {
        await t.rollback();
        return res.status(404).json({ message: 'Post not found' });
      }
      receiverId = post.userId; // Pemilik post
    } else if (entityType === 'comment') {
      const comment = await Comment.findByPk(entityId);
      if (!comment) {
        await t.rollback();
        return res.status(404).json({ message: 'Comment not found' });
      }
      receiverId = comment.userId; // Pemilik komentar
    }

    // 4. Buat like baru
    await Like.create({ userId, entityId, entityType }, { transaction: t });

    // 5. Buat notifikasi jika yang melakukan like bukan pemilik post/komentar
    if (receiverId && receiverId !== userId) {
      await Notification.create(
        {
          receiverId, // Penerima notifikasi (pemilik post/komentar)
          senderId: userId, // Pengirim notifikasi (user yang melakukan like)
          entityId,
          type: 'like',
        },
        { transaction: t },
      );
    }

    await t.commit();
    return res.status(201).json({ message: 'You liked this entity' });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: 'Failed to like',
      error: error.message,
    });
  }
}

async function unlikePost(req, res) {
  const { userId } = req.user;
  const { entityId, entityType } = req.body;
  const t = await sequelize.transaction();

  try {
    const validTypes = ['post', 'comment']; // 🔹 Hanya "post" & "comment"
    if (!validTypes.includes(entityType)) {
      await t.rollback();
      return res.status(400).json({ message: 'Invalid entity type' });
    }

    const existingLike = await Like.findOne({
      where: { userId, entityId, entityType },
      transaction: t,
    });

    if (!existingLike) {
      await t.rollback();
      return res.status(404).json({ message: 'Like not found' });
    }

    await existingLike.destroy({ transaction: t });

    await t.commit();
    return res.status(200).json({ message: 'You unliked this entity' });
  } catch (error) {
    await t.rollback();
    return res.status(500).json({
      message: 'Failed to unlike',
      error: error.message,
    });
  }
}

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

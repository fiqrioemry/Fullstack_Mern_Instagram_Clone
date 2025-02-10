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

// Tested = pass
async function getPostsFromFollowings(req, res) {
  // 1. Ambil req params
  const { userId } = req.user;
  const { limit } = req.query;

  try {
    const total = parseInt(limit) || 5; // 2. Default limit 5

    // 3. Cari user (Followings) relasi many-to-many
    const user = await User.findByPk(userId, {
      include: {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      },
    });

    // 4.  kirim response 404 jika tidak ada
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 5. Ambil daftar userId dari akun yang diikuti
    const followingIds = user.Followings.map(
      (following) => following.Follow.followingId,
    );

    // 6. Jika user tidak mengikuti siapa pun, kirim response kosong
    if (followingIds.length === 0) {
      return res.status(200).json({
        message: 'No posts to show, you are not following anyone.',
        data: [],
      });
    }

    // 7. Ambil semua post dari user yang diikuti
    const posts = await Post.findAll({
      limit: total,
      where: { userId: { [Op.in]: followingIds } },
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          as: 'gallery',
          attributes: ['image'],
        },
      ],
    });

    // 8. Jika tidak ada post ditemukan, kirim response 404
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found' });
    }

    // 9. Hitung jumlah komentar & like untuk setiap post
    const followingPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: 'post' } }),
        ]);

        const { id: postId, content, createdAt, user } = post;
        const { id: userId, username, profile } = user;
        const { fullname, avatar } = profile;
        const images = post.gallery.map((gallery) => gallery.image);

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
          isOwner: userId === req.user?.userId, // 10. Periksa apakah user adalah pemilik post
        };
      }),
    );

    // 11. Kirim response dengan daftar post dari user yang diikuti
    res.status(200).json({
      followingPosts,
    });
  } catch (error) {
    // 12. Tangani error jika terjadi kesalahan saat mengambil data
    res.status(500).json({
      message: 'Failed to retrieve following posts',
      error: error.message,
    });
  }
}

// Tested = pass
async function getPublicPosts(req, res) {
  // 1. Query limit default 5
  const { limit } = req.query;

  try {
    const total = parseInt(limit) || 5;

    // 2. Ambil semua post non-private
    const posts = await Post.findAll({
      limit: total,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'content', 'createdAt'],
      include: [
        {
          model: User,
          as: 'user',
          where: { isPrivate: false }, // public access only
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          as: 'gallery',
          attributes: ['image'],
        },
      ],
    });

    // 3. Jika tidak ada post, kirim response 404
    if (!posts.length) {
      return res.status(404).json({ message: 'No public posts found' });
    }

    // 4. Hitung jumlah komentar & like tiap post
    const publicPosts = await Promise.all(
      posts.map(async (post) => {
        const [commentCount, likeCount] = await Promise.all([
          Comment.count({ where: { postId: post.id } }),
          Like.count({ where: { entityId: post.id, entityType: 'post' } }),
        ]);

        const { id: postId, content, createdAt, user } = post;
        const { id: userId, username, profile } = user;
        const { fullname, avatar } = profile;
        const images = post.gallery.map((gallery) => gallery.image);

        // 5. cek user sebagai pemilik post
        const isOwner = req.user?.userId === userId;

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

    // 6. Kirim response data
    res.status(200).json({
      publicPosts,
    });
  } catch (error) {
    // 7. Error handling for debugging
    return res.status(500).json({
      message: 'Failed to get public posts',
      error: error.message,
    });
  }
}

// Tested = pass
async function getPostDetail(req, res) {
  // 1. Ambil userId dari token autentikasi dan postId dari parameter URL
  const { userId } = req.user;
  const { postId } = req.params;

  try {
    // 2. Cari post berdasarkan ID, include data user, profile, gallery
    const post = await Post.findByPk(postId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username'],
          include: [
            {
              model: Profile,
              as: 'profile',
              attributes: ['fullname', 'avatar'],
            },
          ],
        },
        {
          model: PostGallery,
          as: 'gallery',
          attributes: ['image'],
        },
      ],
    });

    // 3. Jika post tidak ditemukan, kirim response 404
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // 4. Hitung jumlah komentar
    const commentCount = await Comment.count({ where: { postId } });

    // 5. Hitung jumlah like pada post
    const likeCount = await Like.count({
      where: { entityId: postId, entityType: 'post' },
    });

    // 6. Periksa pemilik post atau bkn
    const isOwner = post.user.id === userId;

    // 7. Format data agar mudah dikelola
    const postDetail = {
      userId: post.user.id,
      postId: post.id,
      username: post.user.username,
      fullname: post.user.profile.fullname,
      avatar: post.user.profile.avatar,
      content: post.content,
      images: post.gallery.map((gallery) => gallery.image),
      commentCount,
      likeCount,
      createdAt: post.createdAt,
      isOwner,
    };

    // 8. Kirim response
    res.status(200).json({ postDetail });
  } catch (error) {
    //9. Error handling for debugging
    return res.status(500).json({
      message: 'Failed to get post details',
      error: error.message,
    });
  }
}

// Tested = pass
async function getUserPosts(req, res) {
  // 1. Ambil username dari parameter dan limit dari query string
  const { username } = req.params;
  let { limit } = req.query;
  limit = parseInt(limit) || 5; // Jika tidak ada limit, gunakan default 5

  try {
    // 2. Cari user berdasarkan username
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'isPrivate'],
    });

    // 3. Jika user tidak ditemukan, kirim response 404
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const userId = user.id; // ID pemilik post
    const requestingUserId = req.user.userId; // ID user yang meminta data

    // 4. Jika user lain mencoba mengakses postingan private, cek apakah mereka follow
    if (user.isPrivate && userId !== requestingUserId) {
      const followRecord = await Follow.findOne({
        where: { followerId: requestingUserId, followingId: userId },
      });

      // 5. Jika tidak follow, tolak akses dengan status 403
      if (!followRecord) {
        return res.status(403).json({
          message: 'You must follow this user to see their posts.',
          payload: [],
        });
      }
    }

    // 6. Ambil semua post dari user yang bersangkutan dengan limit dan urutan terbaru
    const posts = await Post.findAll({
      where: { userId },
      limit,
      order: [['createdAt', 'DESC']],
      attributes: [
        'id',
        'content',
        'createdAt',
        // 7. Hitung jumlah komentar pada setiap post
        [
          sequelize.literal(
            `(SELECT COUNT(*) FROM Comments WHERE Comments.postId = Post.id)`,
          ),
          'commentCount',
        ],
        // 8. Hitung jumlah like pada setiap post
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

    // 9. Jika user tidak memiliki post, kembalikan response kosong
    if (!posts.length) {
      return res.status(200).json({
        message: 'This user has no posts',
        payload: [],
      });
    }

    // 10. Format hasil agar lebih rapi
    const userPosts = posts.map((post) => ({
      userId,
      postId: post.id,
      images: post.gallery?.map((gallery) => gallery.image) || [],
      createdAt: post.createdAt,
      likeCount: post.dataValues.likeCount,
      commentCount: post.dataValues.commentCount,
    }));

    // 11. Kembalikan response dengan daftar post user
    return res.status(200).json({
      userPosts,
    });
  } catch (error) {
    // 12. Tangani error jika terjadi kesalahan saat mengambil data
    console.error('Error fetching user posts:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to get user posts',
      error: error.message,
    });
  }
}

// Tested = pass
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

// Tested = pass
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
// tested
async function deletePost(req, res) {
  const { userId } = req.user;
  const { postId } = req.params;
  const t = await sequelize.transaction(); // Mulai transaksi

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

    return res
      .status(200)
      .json({ success: true, message: 'Post deleted successfully' });
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

const router = require('express').Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

// controller
const {
  createPost,
  updatePost,
  deletePost,
  getPostDetail,
  getPublicPosts,
  toggleLikePost,
  getPostsFromFollowings,
} = require('../../controller/post');
const {
  getReplies,
  getComments,
  deleteComment,
  createComment,
  toggleLikeComment,
} = require('../../controller/comment');

router.get('/', isAuthenticate, getPublicPosts);
router.get('/followings', isAuthenticate, getPostsFromFollowings);
router.post('/', upload().array('images', 5), isAuthenticate, createPost);
router.put('/:postId', isAuthenticate, upload().array('images', 5), updatePost);
router.delete('/:postId', isAuthenticate, deletePost);
router.get('/:postId', isAuthenticate, getPostDetail);

// post management (crud)

// like & unlike a post
router.post('/:postId/like/post', isAuthenticate, toggleLikePost);
router.post('/:commentId/like/comment', isAuthenticate, toggleLikeComment);

// comment management on post
router.get('/:postId/comments', isAuthenticate, getComments);
router.post('/:postId/comments', isAuthenticate, createComment);
router.get('/:postId/comments/:commentId', isAuthenticate, getReplies);
router.delete('/:postId/comments/:commentId', isAuthenticate, deleteComment);

module.exports = router;

const express = require('express');
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');
const router = express.Router();

// controller
const {
  likePost,
  createPost,
  updatePost,
  deletePost,
  unlikePost,
  getPostDetail,
  getPublicPosts,
  getPostsFromFollowings,
} = require('../../controller/post');
const {
  createComment,
  getComments,
  deleteComment,
} = require('../../controller/comment');

router.get('/followings', isAuthenticate, getPostsFromFollowings);
router.post(
  '/',
  upload('image').array('images', 5),
  isAuthenticate,
  createPost,
);
router.put(
  '/:postId',
  isAuthenticate,
  upload('image').array('images', 5),
  updatePost,
);
router.delete('/:postId', isAuthenticate, deletePost);
router.get('/', isAuthenticate, getPublicPosts);
router.get('/:postId', isAuthenticate, getPostDetail);

router.post('/', isAuthenticate, createPost);
router.delete('/:postId', isAuthenticate, deletePost);
router.put('/:postId', isAuthenticate, updatePost);

// like & unlike a post
router.post('/:postId/like', isAuthenticate, likePost);
router.delete('/:postId/like', isAuthenticate, unlikePost);

// comment management on post
router.get('/:postId/comments', isAuthenticate, getComments);
router.post('/:postId/comments', isAuthenticate, createComment);
router.delete('/:postId/comments/:commentId', isAuthenticate, deleteComment);

module.exports = router;

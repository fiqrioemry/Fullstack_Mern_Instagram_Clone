const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowings,
  getUserProfile,
  getMyProfile,
  updateMyProfile,
  getFollowRecommend,
  searchUser,
} = require('../../controller/user');
const { getUserPosts } = require('../../controller/post');

const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');

router.get('/profile', isAuthenticate, getMyProfile);
router.put(
  '/profile',
  upload('image').single('file'),
  isAuthenticate,
  updateMyProfile,
);
router.get('/:username', isAuthenticate, getUserProfile);
router.get('/', searchUser);
router.post('/:followingId/follow', isAuthenticate, followUser);
router.get('/:username/posts', isAuthenticate, getUserPosts);
router.delete('/:followingId/unfollow', isAuthenticate, unfollowUser);
router.get('/:username/followers', isAuthenticate, getFollowers);
router.get('/:username/followings', isAuthenticate, getFollowings);
router.get('/recommend/follow', isAuthenticate, getFollowRecommend);

module.exports = router;

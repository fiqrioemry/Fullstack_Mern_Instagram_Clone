const {
  searchUser,
  getMyProfile,
  getUserProfile,
  updateMyProfile,
} = require('../../controller/user');
const { getUserPosts } = require('../../controller/post');

const express = require('express');
const router = express.Router();
const { upload } = require('../../middleware/media');
const isAuthenticate = require('../../middleware/isAuthenticate');
const {
  followUser,
  getFollowers,
  getFollowings,
} = require('../../controller/follow');

router.get('/profile', isAuthenticate, getMyProfile);
router.put(
  '/profile',
  upload('image').single('file'),
  isAuthenticate,
  updateMyProfile,
);
router.get('/', searchUser);
router.get('/:username', isAuthenticate, getUserProfile);
router.post('/:followingId/follow', isAuthenticate, followUser);
router.get('/:username/posts', isAuthenticate, getUserPosts);
router.get('/:username/followers', isAuthenticate, getFollowers);
router.get('/:username/followings', isAuthenticate, getFollowings);

module.exports = router;
